var app = angular.module('myApp', []);
app.controller('myCtrl', function ($scope, $http) { 

    debugger;
    $scope.InsertData = function () {
        var Action = document.getElementById("btnSave").getAttribute("value");
        if (Action == "Submit") {
            $scope.Employee = {};
            $scope.Employee.Name = $scope.Name;
            $scope.Employee.City = $scope.City;
            $scope.Employee.Country = $scope.Country;
            $scope.Employee.Mobile = $scope.Mobile;
            $http(
                {
                    method: "post",
                    url: "http://localhost:60404/Employee/Insert_Employee",
                    datatype: "json",
                    data: JSON.stringify($scope.Employee)
                }).then(function (response) {
                    alert(response.data);
                    $scope.GetAllData();
                    $scope.name = "";
                    $scope.city = "";
                    $scope.country = "";
                    $scope.mobile = "";
                })
        }
        else {
            $scope.Employee = {};
            $scope.Employee.Name = $scope.Name;
            $scope.Employee.City = $scope.City;
            $scope.Employee.Country = $scope.Country;
            $scope.Employee.Mobile = $scope.Mobile;
            $scope.Employee.Id = document.getElementById("EmpID_").value;
            $http({

                method: "post",
                url: "http://localhost:60404/Employee/Update_Employee",
                datatype: "Json",
                data: JSON.stringify($scope.Employee)
            }

            ).then(function (response) {

                alert(response.data);
                $scope.GetAllData();
                $scope.Name = "";
                $scope.City = "";
                $scope.Country = "";  
                $scope.Mobile = "";
                document.getElementById("btnSave").setAttribute("value", "Submit");
                document.getElementById("btnSave").style.backgroundColor = "cornflowerblue";
                document.getElementById("spn").innerHTML = "Add New Employee";  
            })

        }
            


    }
    $scope.GetAllData = function () {
        $http(
            {
                method: "post",
                url: "http://localhost:60404/Employee/Get_allEmployees"

            }).then(function (response) {

                $scope.Employees = response.data;
            },
                function () {
                    alert("Error Occur");
                })

    };
    $scope.DeleteEmp = function (Emp) {
        $http({
            method: "post",
            url: "http://localhost:60404/Employee/Delete_Employee",
            datatype: "json",
            data: JSON.stringify(Emp)
        }).then(function (response) {
            alert(response.data);
            $scope.GetAllData();
        })
    };
    $scope.updateEmp = function (Emp) {
        document.getElementById("EmpID_").value = Emp.Id;
        $scope.Name = Emp.name;
        $scope.City = Emp.city;
        $scope.Country = Emp.country;
        $scope.Mobile = Emp.mobile;

        document.getElementById("btnSave").setAttribute("value", "Update");
        document.getElementById("btnSave").style.backgroundColor = "Yellow";
        document.getElementById("spn").innerHTML = "Update Employee Information"; 

        }
    
    
})