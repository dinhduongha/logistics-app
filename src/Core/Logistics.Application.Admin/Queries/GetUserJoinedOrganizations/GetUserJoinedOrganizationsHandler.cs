﻿using Logistics.Application.Core;
using Logistics.Domain.Entities;
using Logistics.Domain.Persistence;
using Logistics.Shared.Models;
using Logistics.Shared;

namespace Logistics.Application.Admin.Queries;

internal sealed class GetUserJoinedOrganizationsHandler :
    RequestHandler<GetUserJoinedOrganizationsQuery, ResponseResult<OrganizationDto[]>>
{
    private readonly IMainRepository _repository;

    public GetUserJoinedOrganizationsHandler(IMainRepository repository)
    {
        _repository = repository;
    }

    protected override async Task<ResponseResult<OrganizationDto[]>> HandleValidated(
        GetUserJoinedOrganizationsQuery req, 
        CancellationToken cancellationToken)
    {
        var user = await _repository.GetAsync<User>(req.UserId);

        if (user is null)
            return ResponseResult<OrganizationDto[]>.CreateError($"Could not find an user with ID '{req.UserId}'");

        var tenantsIds = user.GetJoinedTenantIds();
        var organizations = _repository.Query<Tenant>()
            .Where(i => tenantsIds.Contains(i.Id))
            .Select(i => new OrganizationDto
            {
                TenantId = i.Id,
                Name = i.Name!,
                DisplayName = i.CompanyName!
            }).ToArray();
        return ResponseResult<OrganizationDto[]>.CreateSuccess(organizations);
    }
}