using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using AngularCURD.Models;
namespace AngularCURD.Controllers
{
    public class EmployeeController : Controller
    {
        // GET: Employee
        public ActionResult Index()
        {
            return View();
        }
        /// Get All Employee  
        public JsonResult Get_allEmployees()
        {
            Database1Entities db = new Database1Entities();
            List<Employee> emp = db.Employees.ToList();
            return Json(emp, JsonRequestBehavior.AllowGet);
        }
        /// Get Employee With Id  
        public JsonResult Get_EmployeeById(string Id)
        {
            Database1Entities db = new Database1Entities();
            int Empid = int.Parse(Id);
            return Json(db.Employees.Find(Empid), JsonRequestBehavior.AllowGet);

        }
        /// Insert New Employee 
        public string Insert_Employee(Employee employee)
        {
           
            if(employee!=null)
            {
                Database1Entities db = new Database1Entities();
                db.Employees.Add(employee);
                db.SaveChanges();
                return "Employee Added Successfully";
            }
            else
            {
                return "Insert Failed";
            }

        }
        /// Delete Employee Information  
        public string Delete_Employee(Employee employee)
        {
            if(employee!=null)
            {
                Database1Entities db = new Database1Entities();
                var Emp = db.Entry(employee);
                if(Emp.State==System.Data.Entity.EntityState.Detached)
                {
                    db.Employees.Attach(employee);
                    db.Employees.Remove(employee);
                   
                   
                }
                db.SaveChanges();
                return "Deleted Successfully";
            }
            else
            {
                return "Error in detail";
            }
        }
        ///update employee information 
        public string Update_Employee(Employee employee)
        {
            if(employee!=null)
            {
                Database1Entities db = new Database1Entities();
                var Emp = db.Entry(employee);
                Employee empobj = db.Employees.Where(x => x.Id == employee.Id).FirstOrDefault();
                empobj.name = employee.name;
                empobj.country = employee.country;
                empobj.city = employee.city;
                empobj.mobile = employee.mobile;
                db.SaveChanges();
                return "update successfully";
            }
            else
            {
                return "update failed";
            }
            
        }
    }
}