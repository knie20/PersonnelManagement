using Microsoft.EntityFrameworkCore;
using NuGet.Packaging.Signing;
using PersonnelManagement.Api.Models;

namespace PersonnelManagement.Api.Data
{
    public interface IEmployeeRepository
    {
        Task<int> Create(Employee employee);
        Task<List<Employee>> GetByIdList(List<int> ids);
        Task<List<Employee>> GetDirectReportsById(int id);
        Task<List<int>> GetManagerIds();
        Task<List<Employee>> GetAllEmployees();
        Task<List<Role>> GetAllRoles();
        Task CreateEmployeeRoles(List<EmployeeRole> employeeRoles);
    }

    public class EmployeeRepository : IEmployeeRepository
    {
        private readonly EmployeeContext _employeeContext;
        private readonly EmployeeRoleContext _employeeRoleContext;
        public EmployeeRepository(EmployeeContext employeeContext, EmployeeRoleContext employeeRoleContext)
        {
            _employeeContext = employeeContext;
            _employeeRoleContext = employeeRoleContext;
        }

        public async Task<List<Employee>> GetAllEmployees()
        {
            var query = _employeeContext.Employees
                .Include(e => e.Role);

            return await query.ToListAsync();
        }

        public async Task<List<Role>> GetAllRoles()
        {
            return await _employeeContext.Roles.ToListAsync();
        }

        public async Task<List<Employee>> GetByIdList(List<int> ids)
        {
            var query = _employeeContext.Employees
                .Where(e => ids.Contains(e.Id))
                .Include(e => e.Role);

            return await query.ToListAsync();
        }

        public async Task<List<int>> GetManagerIds()
        {
            return await _employeeContext.Employees
                .Select(e => e.ReportsTo)
                .Where(id => id != default)
                .Distinct()
                .ToListAsync();
        }

        public async Task<List<Employee>> GetDirectReportsById(int id)
        {
            var query = _employeeContext.Employees
                .Where(e => e.ReportsTo == id)
                .Include(e => e.Role);
            return await query.ToListAsync();
        }

        public async Task<int> Create(Employee employee)
        {
            await _employeeContext.Employees.AddAsync(employee);
            await _employeeContext.SaveChangesAsync();

            return employee.Id;
        }

        public async Task CreateEmployeeRoles(List<EmployeeRole> employeeRoles)
        {
            await _employeeRoleContext.EmployeeRole.AddRangeAsync(employeeRoles);
            await _employeeRoleContext.SaveChangesAsync();
        }

    }
}
