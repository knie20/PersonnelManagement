export interface Employee {
    id: number,
    firstName: number,
    lastName: number,
    reportsTo: number,
    role: Role[]
}

export interface Role {
    id: number,
    name: Number
}

export interface EmployeeRole {
    id: number,
    employeeId: number,
    roleId: number
}