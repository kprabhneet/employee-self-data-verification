import { useEffect, useState } from 'react'

const API = 'http://localhost:8080/api/employees'

const emptyForm = { name: '', email: '', phone: '', department: '', address: '' }

const statusColors = {
  PENDING: 'secondary',
  SUBMITTED: 'primary',
  APPROVED: 'success',
  NEEDS_CORRECTION: 'danger',
}

function App() {
  const [employees, setEmployees] = useState([])
  const [form, setForm] = useState(emptyForm)
  const [editingId, setEditingId] = useState(null)

  function loadEmployees() {
    fetch(API)
      .then(res => res.json())
      .then(data => setEmployees(data))
  }

  useEffect(() => {
    loadEmployees()
  }, [])

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  function handleSubmit(e) {
    e.preventDefault()
    const url = editingId ? `${API}/${editingId}` : API
    const method = editingId ? 'PUT' : 'POST'

    fetch(url, {
      method: method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    }).then(() => {
      setForm(emptyForm)
      setEditingId(null)
      loadEmployees()
    })
  }

  function startEdit(emp) {
    setForm({
      name: emp.name,
      email: emp.email,
      phone: emp.phone,
      department: emp.department,
      address: emp.address,
    })
    setEditingId(emp.id)
  }

  function cancelEdit() {
    setForm(emptyForm)
    setEditingId(null)
  }

  function updateStatus(id, value) {
    fetch(`${API}/${id}/status?value=${value}`, { method: 'PUT' })
      .then(() => loadEmployees())
  }

  function countBy(status) {
    return employees.filter(emp => emp.status === status).length
  }

  return (
    <div className="container py-4">
      <h2 className="mb-1">Employee Self Data Verification</h2>
      <p className="text-muted mb-4">Yearly self data review</p>

      <div className="row g-3 mb-4">
        {Object.keys(statusColors).map(status => (
          <div className="col-6 col-md-3" key={status}>
            <div className={`card border-${statusColors[status]}`}>
              <div className="card-body">
                <div className="text-muted small">{status.replace('_', ' ')}</div>
                <div className={`fs-3 fw-bold text-${statusColors[status]}`}>
                  {countBy(status)}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="card mb-4">
        <div className="card-body">
          <h5 className="card-title mb-3">
            {editingId ? `Verify details for employee #${editingId}` : 'Add new employee'}
          </h5>
          <form onSubmit={handleSubmit} className="row g-2">
            <div className="col-md-4">
              <input className="form-control" name="name" placeholder="Name"
                value={form.name} onChange={handleChange} required />
            </div>
            <div className="col-md-4">
              <input className="form-control" name="email" type="email" placeholder="Email"
                value={form.email} onChange={handleChange} required />
            </div>
            <div className="col-md-4">
              <input className="form-control" name="phone" placeholder="Phone"
                value={form.phone} onChange={handleChange} required />
            </div>
            <div className="col-md-4">
              <input className="form-control" name="department" placeholder="Department"
                value={form.department} onChange={handleChange} required />
            </div>
            <div className="col-md-4">
              <input className="form-control" name="address" placeholder="Address"
                value={form.address} onChange={handleChange} required />
            </div>
            <div className="col-md-4 d-flex gap-2">
              <button type="submit" className="btn btn-primary">
                {editingId ? 'Submit details' : 'Add employee'}
              </button>
              {editingId && (
                <button type="button" className="btn btn-outline-secondary" onClick={cancelEdit}>
                  Cancel
                </button>
              )}
            </div>
          </form>
        </div>
      </div>

      <div className="table-responsive">
        <table className="table table-bordered table-hover align-middle">
          <thead className="table-dark">
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Department</th>
              <th>Address</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {employees.length === 0 && (
              <tr>
                <td colSpan="8" className="text-center text-muted">No employees yet</td>
              </tr>
            )}
            {employees.map(emp => (
              <tr key={emp.id}>
                <td>{emp.id}</td>
                <td>{emp.name}</td>
                <td>{emp.email}</td>
                <td>{emp.phone}</td>
                <td>{emp.department}</td>
                <td>{emp.address}</td>
                <td>
                  <span className={`badge bg-${statusColors[emp.status]}`}>
                    {emp.status.replace('_', ' ')}
                  </span>
                </td>
                <td>
                  <div className="d-flex gap-1">
                    <button className="btn btn-sm btn-outline-primary"
                      onClick={() => startEdit(emp)}
                      disabled={emp.status === 'APPROVED'}>
                      Verify
                    </button>
                    <button className="btn btn-sm btn-success"
                      onClick={() => updateStatus(emp.id, 'APPROVED')}
                      disabled={emp.status !== 'SUBMITTED'}>
                      Approve
                    </button>
                    <button className="btn btn-sm btn-danger"
                      onClick={() => updateStatus(emp.id, 'NEEDS_CORRECTION')}
                      disabled={emp.status !== 'SUBMITTED'}>
                      Needs Correction
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default App