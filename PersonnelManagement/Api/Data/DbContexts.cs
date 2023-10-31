using Microsoft.EntityFrameworkCore;
using PersonnelManagement.Api.Models;
using System.Reflection.Metadata;

namespace PersonnelManagement.Api.Data
{
    public class EmployeeContext: DbContext
    {
        public DbSet<Employee> Employees { get; set; }
        public DbSet<Role> Roles { get; set; }

        public EmployeeContext(DbContextOptions<EmployeeContext> options)
        : base(options)
        {
        }
    }

    public class EmployeeRoleContext : DbContext
    {
        public DbSet<EmployeeRole> EmployeeRole { get; set; }

        public EmployeeRoleContext(DbContextOptions<EmployeeRoleContext> options)
        : base(options)
        {
        }
    }
}
