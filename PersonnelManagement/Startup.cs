using Microsoft.EntityFrameworkCore;
using PersonnelManagement.Api.Data;
using PersonnelManagement.Controllers;

namespace PersonnelManagement
{
    public static class Startup
    {
        public static void ConfigureServices(this WebApplicationBuilder builder)
        {
            builder.Services.AddControllersWithViews();

            var sqlConn = builder.Configuration["ConnectionStrings"];

            builder.Services.AddDbContext<EmployeeContext>(
                options => options.UseSqlServer(sqlConn));
            builder.Services.AddDbContext<EmployeeRoleContext>(
                options => options.UseSqlServer(sqlConn));

            builder.Services.AddTransient<IEmployeeRepository, EmployeeRepository>();
        }
    }
}
