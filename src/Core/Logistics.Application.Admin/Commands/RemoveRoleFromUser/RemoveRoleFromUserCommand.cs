﻿namespace Logistics.Application.Admin.Commands;

public class RemoveRoleFromUserCommand : Request<ResponseResult>
{
    public string? UserId { get; set; }
    public string? Role { get; set; }
}