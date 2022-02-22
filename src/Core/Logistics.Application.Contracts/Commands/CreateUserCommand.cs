﻿namespace Logistics.Application.Contracts.Commands;

public class CreateUserCommand : RequestBase<DataResult>
{
    public string? ExternalId { get; init; }
    public string? FirstName { get; init; }
    public string? LastName { get; init; }
    public string? Email { get; init; }
    public string? PhoneNumber { get; init; }
}