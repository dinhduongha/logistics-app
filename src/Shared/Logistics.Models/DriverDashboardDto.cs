﻿namespace Logistics.Models;

public class DriverDashboardDto
{
    public string? TruckNumber { get; set; }
    public string? DriverFullName { get; set; }
    public LoadDto? AssignedLoad { get; set; }
}