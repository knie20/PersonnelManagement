using Microsoft.AspNetCore.Mvc;
using PersonnelManagement.Api.Data;
using PersonnelManagement.Api.Models;

namespace PersonnelManagement.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class EmployeesController : ControllerBase
    {
        private readonly IEmployeeRepository _employeeRepo;

        public EmployeesController(IEmployeeRepository employeeRepo)
        {
            _employeeRepo = employeeRepo;
        }

        // GET: /Employees
        [HttpGet]
        public async Task<ActionResult<List<Employee>>> GetAllEmployees()
        {
            var employees = await _employeeRepo.GetAllEmployees();

            return Ok(ToViewModel(employees));
        }

        // GET: /Employees
        [HttpGet("roles")]
        public async Task<ActionResult<List<Role>>> GetAllRoles()
        {
            var roles = await _employeeRepo.GetAllRoles();

            return Ok(roles);
        }

        // GET: /Employees/managers
        [HttpGet("managers")]
        public async Task<ActionResult<List<Employee>>> GetManagers()
        {
            var ids = await _employeeRepo.GetManagerIds();

            if (!ids.Any())
            {
                return NotFound();
            }

            var employees = await _employeeRepo.GetByIdList(ids);

            return Ok(ToViewModel(employees));
        }

        // GET: api/Employees/directReports/5
        [HttpGet()]
        [Route("directreports/{managerId}")]
        public async Task<ActionResult<List<Employee>>> GetDirectReports(int managerId)
        {
            var employees = await _employeeRepo.GetDirectReportsById(managerId);
            
            return Ok(ToViewModel(employees));
        }

        // POST: api/Employees/
        [HttpPost]
        public async Task<ActionResult<int>> PostEmployee(Employee employee)
        {
            var newId = await _employeeRepo.Create(employee);

            return Ok(newId);
        }

        // POST: api/Employees/employeerole
        [HttpPost]
        [Route("employeerole")]
        public async Task<ActionResult> PostEmployeeRoles(List<EmployeeRole> employeeRoles)
        {
            await _employeeRepo.CreateEmployeeRoles(employeeRoles);

            return Ok();
        }

        private dynamic ToViewModel(List<Employee> employees)
        {
            return employees.Select(e => new
            {
                e.Id,
                e.FirstName,
                e.LastName,
                e.ReportsTo,
                Roles = e.Role.Select(r => new
                {
                    r.Name
                })
            });
        }
        private dynamic ToViewModel(List<Role> roles)
        {
            return roles.Select(r => new
            {
                r.Id,
                r.Name
            });
        }

    }
}
