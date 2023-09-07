﻿namespace Logistics.Domain.Specifications;

public class GetEmployeesById : BaseSpecification<Employee>
{
    public GetEmployeesById(string[] userIds)
    {
        Criteria = i => userIds.Contains(i.Id);
        OrderBy = i => i.Id;
    }
}