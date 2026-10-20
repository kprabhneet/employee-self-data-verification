package com.prabhneet.employeeverification;

import java.util.List;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/employees")
public class EmployeeController {

    private final EmployeeRepository repository;

    public EmployeeController(EmployeeRepository repository) {
        this.repository = repository;
    }

    @GetMapping
    public List<Employee> getAllEmployees() {
        return repository.findAll();
    }

    @PostMapping
    public Employee addEmployee(@RequestBody Employee employee) {
        employee.setStatus("PENDING");
        return repository.save(employee);
    }
    
    @PutMapping("/{id}")
    public Employee submitDetails(@PathVariable Long id, @RequestBody Employee updated) {
        Employee employee = repository.findById(id).orElseThrow();
        employee.setName(updated.getName());
        employee.setEmail(updated.getEmail());
        employee.setPhone(updated.getPhone());
        employee.setDepartment(updated.getDepartment());
        employee.setAddress(updated.getAddress());
        employee.setStatus("SUBMITTED");
        return repository.save(employee);
    }
    @PutMapping("/{id}/status")
    public Employee updateStatus(@PathVariable Long id, @RequestParam String value) {
        Employee employee = repository.findById(id).orElseThrow();
        employee.setStatus(value);
        return repository.save(employee);
    }
}