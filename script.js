let leads = JSON.parse(localStorage.getItem('leads')) || [];
let editId = null;

const form = document.getElementById('leadForm');
const tbody = document.getElementById('leadsBody');
const noData = document.getElementById('noData');
const totalLeads = document.getElementById('totalLeads');
const submitBtn = document.getElementById('submitBtn');
const cancelBtn = document.getElementById('cancelBtn');
const formTitle = document.getElementById('formTitle');

function saveLeads() {
  localStorage.setItem('leads', JSON.stringify(leads));
  renderLeads();
}

function renderLeads() {
  tbody.innerHTML = '';
  totalLeads.textContent = leads.length;

  if (leads.length === 0) {
    noData.style.display = 'block';
    document.querySelector('table').style.display = 'none';
    return;
  }

  noData.style.display = 'none';
  document.querySelector('table').style.display = 'table';

  leads.forEach((lead, i) => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${lead.name}</td>
      <td>${lead.email}</td>
      <td>${lead.phone || '-'}</td>
      <td>${lead.source}</td>
      <td>
        <select onchange="updateStatus(${i}, this.value)">
          <option ${lead.status === 'New'? 'selected' : ''}>New</option>
          <option ${lead.status === 'Contacted'? 'selected' : ''}>Contacted</option>
          <option ${lead.status === 'Converted'? 'selected' : ''}>Converted</option>
          <option ${lead.status === 'Lost'? 'selected' : ''}>Lost</option>
        </select>
      </td>
      <td>${lead.notes || '-'}</td>
      <td>${lead.date}</td>
      <td>
        <button class="btn-edit" onclick="editLead(${i})">Edit</button>
        <button class="btn-delete" onclick="deleteLead(${i})">Delete</button>
      </td>
    `;
    tbody.appendChild(tr);
  });
}

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const lead = {
    name: document.getElementById('name').value,
    email: document.getElementById('email').value,
    phone: document.getElementById('phone').value,
    source: document.getElementById('source').value,
    status: editId !== null ? leads[editId].status : 'New',
    notes: document.getElementById('notes').value,
    date: editId !== null ? leads[editId].date : new Date().toLocaleDateString()
  };

  if (editId !== null) {
    leads[editId] = lead;
    editId = null;
    submitBtn.textContent = 'Add Lead';
    cancelBtn.style.display = 'none';
    formTitle.textContent = 'Add New Lead';
  } else {
    leads.unshift(lead);
  }

  form.reset();
  saveLeads();
});

function updateStatus(index, status) {
  leads[index].status = status;
  saveLeads();
}

function editLead(index) {
  const lead = leads[index];
  document.getElementById('name').value = lead.name;
  document.getElementById('email').value = lead.email;
  document.getElementById('phone').value = lead.phone;
  document.getElementById('source').value = lead.source;
  document.getElementById('notes').value = lead.notes;
  editId = index;
  submitBtn.textContent = 'Update Lead';
  cancelBtn.style.display = 'inline-block';
  formTitle.textContent = 'Edit Lead';
}

function deleteLead(index) {
  if (confirm('Delete this lead?')) {
    leads.splice(index, 1);
    saveLeads();
  }
}

cancelBtn.addEventListener('click', () => {
  form.reset();
  editId = null;
  submitBtn.textContent = 'Add Lead';
  cancelBtn.style.display = 'none';
  formTitle.textContent = 'Add New Lead';
});

renderLeads();