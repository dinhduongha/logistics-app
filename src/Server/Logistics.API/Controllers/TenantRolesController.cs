﻿using Logistics.Shared.Models;

namespace Logistics.API.Controllers;

[Route("tenant-roles")]
[ApiController]
public class TenantRolesController : ControllerBase
{
    private readonly IMediator _mediator;

    public TenantRolesController(IMediator mediator)
    {
        _mediator = mediator;
    }

    [HttpGet]
    [ProducesResponseType(typeof(PagedResponseResult<TenantRoleDto>), StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(ResponseResult), StatusCodes.Status400BadRequest)]
    [Authorize(Policy = Permissions.TenantRoles.View)]
    public async Task<IActionResult> GetList([FromQuery] GetTenantRolesQuery query)
    {
        var result = await _mediator.Send(query);
        return result.IsSuccess ? Ok(result) : BadRequest(result);
    }
}
