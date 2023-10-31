namespace PersonnelManagement.Api.Models
{
    public class Employee
    {
        public int Id { get; set; }
        public required string FirstName { get; set; }
        public required string LastName { get; set; }
        public int ReportsTo { get; set; }
        public List<Role> Role { get; } = new();
    }

    public class Role
    {
        public int Id { get; set; }
        public required string Name { get; set; }
        public List<Employee> Employee { get; } = new();
    }

    public class EmployeeRole
    {
        public int Id { get; set; }
        public int EmployeeId { get; set; }
        public int RoleId { get; set; }
    }
}
