const STORAGE_KEY = "dentalSupportData_v1";
const statusLabels = {
  open: "Открыто",
  progress: "В работе",
  waiting: "Ожидает клиента",
  solved: "Решено",
};
const priorityLabels = {
  low: "Низкий",
  normal: "Обычный",
  high: "Высокий",
  urgent: "Срочный",
};
const statusClasses = {
  open: "status-open",
  progress: "status-progress",
  waiting: "status-waiting",
  solved: "status-solved",
};
const priorityClasses = {
  low: "priority-low",
  normal: "priority-normal",
  high: "priority-high",
  urgent: "priority-urgent",
};
const avatarClasses = [
  "avatar-blue",
  "avatar-teal",
  "avatar-purple",
  "avatar-orange",
];
const initials = (name) =>
  (name || "Клиент")
    .split(/\s+/)
    .slice(0, 2)
    .map((s) => s[0])
    .join("")
    .toUpperCase();
const esc = (value) =>
  String(value ?? "").replace(
    /[&<>"']/g,
    (c) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[
        c
      ],
  );
const nowText = () =>
  new Date()
    .toLocaleString("ru-RU", {
      day: "2-digit",
      month: "short",
      hour: "2-digit",
      minute: "2-digit",
    })
    .replace(",", "");
const stamp = () => new Date().toISOString();

function demoData() {
  const customers = [
    {
      id: "C-001",
      name: "Стоматология Дентал",
      contact: "Ирина Смирнова",
      phone: "+7 4012 55-21-10",
      email: "info@dental-example.ru",
      city: "Калининград",
    },
    {
      id: "C-002",
      name: "Клиника «Улыбка»",
      contact: "Алексей Морозов",
      phone: "+7 4012 61-40-22",
      email: "office@ulybka-example.ru",
      city: "Зеленоградск",
    },
    {
      id: "C-003",
      name: "Дентал Профи",
      contact: "Мария Волкова",
      phone: "+7 4012 70-18-35",
      email: "lab@dentalpro-example.ru",
      city: "Калининград",
    },
    {
      id: "C-004",
      name: "Лаборатория «Эстетика»",
      contact: "Сергей Павлов",
      phone: "+7 4012 44-09-12",
      email: "tech@estetika-example.ru",
      city: "Гурьевск",
    },
  ];
  const equipment = [
    {
      id: "EQ-001",
      customerId: "C-001",
      name: "Фрезерный станок",
      model: "Exostom U5 Wet",
      serial: "DMX5-240018",
      purchaseDate: "2025-03-14",
      warranty: "2027-03-14",
    },
    {
      id: "EQ-002",
      customerId: "C-002",
      name: "Лабораторный сканер",
      model: "Exostom RapidScan Pro 2 ",
      serial: "SP3D-230442",
      purchaseDate: "2024-11-02",
      warranty: "2026-11-02",
    },
    {
      id: "EQ-003",
      customerId: "C-003",
      name: "Печь для синтеризации",
      model: "Exostom DeskFab X1",
      serial: "SM16-240103",
      purchaseDate: "2025-01-18",
      warranty: "2027-01-18",
    },
    {
      id: "EQ-004",
      customerId: "C-004",
      name: "3D-принтер",
      model: "Exostom Dental Print Pro",
      serial: "MP8K-250071",
      purchaseDate: "2025-07-07",
      warranty: "2027-07-07",
    },
  ];
  const tickets = [
    {
      id: "DS-1042",
      title: "Ошибка фрезерного станка",
      customerId: "C-001",
      equipmentId: "EQ-001",
      description:
        "При запуске черновой обработки станок останавливается и показывает ошибку. Перезапуск не помог. Ошибка появилась сегодня утром.",
      status: "open",
      priority: "urgent",
      createdAt: stamp(),
      updatedAt: stamp(),
      messages: [
        {
          from: "customer",
          text: "Здравствуйте. Фрезерный станок выдаёт ошибку при запуске черновой обработки.",
          time: "Сегодня, 10:42",
        },
        {
          from: "agent",
          text: "Здравствуйте! Пришлите, пожалуйста, точный текст ошибки или фото экрана. Также уточните, на какой операции появляется ошибка.",
          time: "Сегодня, 10:48",
        },
      ],
    },
    {
      id: "DS-1041",
      title: "Не подключается сканер",
      customerId: "C-002",
      equipmentId: "EQ-002",
      description:
        "После обновления компьютера программа не видит лабораторный сканер. Кабель подключён, индикатор питания горит.",
      status: "progress",
      priority: "high",
      createdAt: stamp(),
      updatedAt: stamp(),
      messages: [
        {
          from: "customer",
          text: "После обновления Windows сканер перестал определяться.",
          time: "Сегодня, 10:18",
        },
        {
          from: "agent",
          text: "Проверяем совместимость драйвера с новой версией программы. Вернусь с инструкцией.",
          time: "Сегодня, 10:25",
        },
      ],
    },
    {
      id: "DS-1040",
      title: "Вопрос по гарантии",
      customerId: "C-003",
      equipmentId: "EQ-003",
      description:
        "Клиент уточняет срок гарантии и условия сервисного обслуживания печи.",
      status: "waiting",
      priority: "normal",
      createdAt: stamp(),
      updatedAt: stamp(),
      messages: [
        {
          from: "customer",
          text: "Подскажите, действует ли гарантия на печь и что входит в обслуживание?",
          time: "Сегодня, 09:56",
        },
        {
          from: "agent",
          text: "Для проверки пришлите, пожалуйста, фото шильдика с серийным номером.",
          time: "Сегодня, 10:02",
        },
      ],
    },
    {
      id: "DS-1039",
      title: "Настройка профиля печи",
      customerId: "C-004",
      equipmentId: "EQ-004",
      description:
        "Нужно помочь импортировать профиль печати для новой партии модельной смолы.",
      status: "solved",
      priority: "low",
      createdAt: stamp(),
      updatedAt: stamp(),
      messages: [
        {
          from: "customer",
          text: "Не получается импортировать профиль.",
          time: "Вчера, 16:10",
        },
        {
          from: "agent",
          text: "Отправил инструкцию и проверил настройки вместе с вами. Профиль загрузился корректно.",
          time: "Вчера, 16:42",
        },
      ],
    },
    {
      id: "DS-1038",
      title: "Запрос расходных материалов",
      customerId: "C-001",
      equipmentId: "EQ-001",
      description: "Уточнить наличие фрез и сроки поставки.",
      status: "open",
      priority: "normal",
      createdAt: stamp(),
      updatedAt: stamp(),
      messages: [
        {
          from: "customer",
          text: "Добрый день, нужны фрезы 2 мм. Есть в наличии?",
          time: "Вчера, 14:20",
        },
      ],
    },
    {
      id: "DS-1037",
      title: "Плановое обслуживание",
      customerId: "C-002",
      equipmentId: "EQ-002",
      description: "Согласовать дату планового технического обслуживания.",
      status: "solved",
      priority: "low",
      createdAt: stamp(),
      updatedAt: stamp(),
      messages: [
        {
          from: "customer",
          text: "Хотим записаться на обслуживание.",
          time: "Вчера, 11:05",
        },
        {
          from: "agent",
          text: "Записал на согласованную дату. Детали отправлены на почту.",
          time: "Вчера, 11:22",
        },
      ],
    },
  ];
  return {
    customers,
    equipment,
    tickets,
    nextTicket: 1043,
    nextCustomer: 5,
    nextEquipment: 5,
  };
}
function loadData() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch (e) {
    console.warn("Не удалось прочитать данные", e);
  }
  return demoData();
}
let db = loadData(),
  currentFilter = "all",
  selectedTicketId = null,
  modalType = null;
function save() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(db));
  renderAll();
}
function customerById(id) {
  return db.customers.find((c) => c.id === id);
}
function equipmentById(id) {
  return db.equipment.find((e) => e.id === id);
}
function ticketById(id) {
  return db.tickets.find((t) => t.id === id);
}
function statusPill(status) {
  return `<span class="status-pill ${statusClasses[status] || ""}">${esc(statusLabels[status] || status)}</span>`;
}
function priorityPill(priority) {
  return `<span class="priority-pill ${priorityClasses[priority] || ""}">${esc(priorityLabels[priority] || priority)}</span>`;
}
function relativeDate(iso) {
  if (!iso) return "—";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "—";
  const today = new Date();
  if (d.toDateString() === today.toDateString())
    return (
      "Сегодня, " +
      d.toLocaleTimeString("ru-RU", { hour: "2-digit", minute: "2-digit" })
    );
  return d.toLocaleDateString("ru-RU", { day: "2-digit", month: "short" });
}
function renderStats() {
  const count = (s) => db.tickets.filter((t) => t.status === s).length;
  document.querySelector("#statOpen").textContent = count("open");
  document.querySelector("#statProgress").textContent = count("progress");
  document.querySelector("#statWaiting").textContent = count("waiting");
  document.querySelector("#statSolved").textContent = count("solved");
  document.querySelector("#openCount").textContent =
    count("open") + count("progress") + count("waiting");
  document.querySelector("#filterAll").textContent = db.tickets.length;
  document.querySelector("#reportTotal").textContent = db.tickets.length;
  document.querySelector("#reportCustomers").textContent = db.customers.length;
  document.querySelector("#reportEquipment").textContent = db.equipment.length;
  const statuses = ["open", "progress", "waiting", "solved"],
    total = Math.max(1, db.tickets.length);
  document.querySelector("#statusBars").innerHTML = statuses
    .map(
      (s) =>
        `<div class="status-bar-row"><span>${statusLabels[s]}</span><div class="bar-track"><div class="bar-fill ${s}" style="width:${(count(s) / total) * 100}%"></div></div><strong>${count(s)}</strong></div>`,
    )
    .join("");
}
function renderTickets() {
  const query = (
    document.querySelector("#ticketSearch").value +
    " " +
    document.querySelector("#globalSearch").value
  )
    .trim()
    .toLowerCase();
  const list = [...db.tickets]
    .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))
    .filter((t) => {
      const c = customerById(t.customerId),
        e = equipmentById(t.equipmentId);
      const hay = [
        t.id,
        t.title,
        t.description,
        c?.name,
        c?.contact,
        e?.name,
        e?.model,
        e?.serial,
      ]
        .join(" ")
        .toLowerCase();
      return (
        (currentFilter === "all" || t.status === currentFilter) &&
        hay.includes(query)
      );
    });
  document.querySelector("#ticketRows").innerHTML = list
    .map((t) => {
      const c = customerById(t.customerId),
        e = equipmentById(t.equipmentId);
      return `<tr data-ticket-id="${esc(t.id)}"><td><div class="ticket-main"><div class="ticket-type-icon">⚙</div><div><strong>${esc(t.title)}</strong><span>${esc(t.id)} · ${t.messages.length} сообщ.</span></div></div></td><td><div class="client-cell"><strong>${esc(c?.name || "Неизвестный клиент")}</strong><span>${esc(c?.contact || "")}</span></div></td><td><div class="client-cell"><strong>${esc(e?.name || "Не указано")}</strong><span>${esc(e?.model || "")}</span></div></td><td>${priorityPill(t.priority)}</td><td>${statusPill(t.status)}</td><td>${esc(relativeDate(t.updatedAt))}</td></tr>`;
    })
    .join("");
  document
    .querySelector("#ticketEmpty")
    .classList.toggle("hidden", list.length > 0);
  document.querySelector("#ticketCountText").textContent =
    `Показано ${list.length} из ${db.tickets.length} обращений`;
}
function renderCustomers() {
  const q = document
    .querySelector("#customerSearch")
    .value.toLowerCase()
    .trim();
  const list = db.customers.filter((c) =>
    [c.name, c.contact, c.phone, c.email, c.city, c.id]
      .join(" ")
      .toLowerCase()
      .includes(q),
  );
  document.querySelector("#customerGrid").innerHTML =
    list
      .map((c, i) => {
        const n = db.tickets.filter((t) => t.customerId === c.id).length,
          eq = db.equipment.filter((e) => e.customerId === c.id).length;
        return `<article class="customer-card"><div class="customer-card-head"><div class="avatar ${avatarClasses[i % avatarClasses.length]}">${esc(initials(c.name))}</div><div><h3>${esc(c.name)}</h3><p>${esc(c.id)} · ${esc(c.city || "Город не указан")}</p></div></div><p>${esc(c.contact || "Контакт не указан")}</p><p>${esc(c.phone || "Телефон не указан")}</p><p class="customer-email">${esc(c.email || "Email не указан")}</p><div class="customer-meta"><span>⚙ ${eq} ед. оборудования</span><span>▤ ${n} обращ.</span></div></article>`;
      })
      .join("") || '<div class="empty-state">Клиенты не найдены.</div>';
}
function renderEquipment() {
  const q = document
    .querySelector("#equipmentSearch")
    .value.toLowerCase()
    .trim();
  const list = db.equipment.filter((e) => {
    const c = customerById(e.customerId);
    return [e.id, e.name, e.model, e.serial, c?.name, e.warranty]
      .join(" ")
      .toLowerCase()
      .includes(q);
  });
  document.querySelector("#equipmentGrid").innerHTML =
    list
      .map((e, i) => {
        const c = customerById(e.customerId);
        return `<article class="equipment-card"><div class="equipment-card-head"><div class="equipment-icon-large">⚙</div><div><h3>${esc(e.name)}</h3><p>${esc(e.model)}</p></div></div><p class="serial">Серийный номер: <strong>${esc(e.serial)}</strong></p><p>Гарантия до: ${esc(e.warranty || "не указана")}</p><p class="equipment-owner">${esc(c?.name || "Клиент не указан")}</p><div class="customer-meta"><span>${esc(e.id)}</span><span>${db.tickets.filter((t) => t.equipmentId === e.id).length} обращ.</span></div></article>`;
      })
      .join("") || '<div class="empty-state">Оборудование не найдено.</div>';
}
function renderAll() {
  renderStats();
  renderTickets();
  renderCustomers();
  renderEquipment();
  if (
    selectedTicketId &&
    !document.querySelector("#ticketOverlay").classList.contains("hidden")
  )
    renderTicketDetail(selectedTicketId);
}
function showView(name) {
  document
    .querySelectorAll(".view")
    .forEach((v) => v.classList.toggle("active", v.id === `view-${name}`));
  document
    .querySelectorAll(".nav-item")
    .forEach((b) => b.classList.toggle("active", b.dataset.view === name));
  const titles = {
    inbox: "Обращения",
    customers: "Клиенты",
    equipment: "Оборудование",
    reports: "Сводка",
  };
  document.querySelector("#pageTitle").textContent =
    titles[name] || "Обращения";
  document.querySelector("#sidebar").classList.remove("mobile-open");
}
function openTicket(id) {
  selectedTicketId = id;
  renderTicketDetail(id);
  document.querySelector("#ticketOverlay").classList.remove("hidden");
  document.body.style.overflow = "hidden";
}
function closeTicket() {
  document.querySelector("#ticketOverlay").classList.add("hidden");
  document.body.style.overflow = "";
  selectedTicketId = null;
}
function renderTicketDetail(id) {
  const t = ticketById(id);
  if (!t) return closeTicket();
  const c = customerById(t.customerId),
    e = equipmentById(t.equipmentId);
  document.querySelector("#detailTitle").textContent = t.title;
  document.querySelector("#detailId").textContent =
    `${t.id} · создано ${relativeDate(t.createdAt)}`;
  document.querySelector("#detailStatus").outerHTML = statusPill(
    t.status,
  ).replace(
    '<span class="status-pill',
    '<span id="detailStatus" class="status-pill',
  );
  document.querySelector("#detailPriority").outerHTML = priorityPill(
    t.priority,
  ).replace(
    '<span class="priority-pill',
    '<span id="detailPriority" class="priority-pill',
  );
  document.querySelector("#detailDescription").textContent =
    t.description || "Описание не добавлено.";
  document.querySelector("#detailCustomerAvatar").textContent = initials(
    c?.name,
  );
  document.querySelector("#detailCustomer").textContent =
    c?.name || "Клиент не указан";
  document.querySelector("#detailContact").textContent = [
    c?.contact,
    c?.phone,
    c?.email,
  ]
    .filter(Boolean)
    .join(" · ");
  document.querySelector("#detailEquipment").textContent = e
    ? [e.name, e.model].filter(Boolean).join(" — ")
    : "Не указано";
  document.querySelector("#detailSerial").textContent = e
    ? `Серийный номер: ${e.serial}`
    : "";
  document.querySelector("#detailStatusSelect").value = t.status;
  document.querySelector("#detailPrioritySelect").value = t.priority;
  document.querySelector("#messageCount").textContent =
    `${t.messages.length} сообщ.`;
  document.querySelector("#messages").innerHTML = t.messages
    .map(
      (m) =>
        `<div class="message ${m.from === "agent" ? "agent" : ""}"><div class="message-bubble">${esc(m.text).replace(/\n/g, "<br>")}</div><span class="message-meta">${m.from === "agent" ? "Вы" : "Клиент"} · ${esc(m.time || "")}</span></div>`,
    )
    .join("");
}
function toast(message) {
  const el = document.createElement("div");
  el.className = "toast";
  el.textContent = message;
  document.querySelector("#toastContainer").append(el);
  setTimeout(() => el.remove(), 3200);
}
function field(
  name,
  label,
  type = "text",
  options = null,
  placeholder = "",
  required = true,
) {
  let input = "";
  if (type === "select")
    input = `<select name="${name}" ${required ? "required" : ""}>${(options || []).map((o) => `<option value="${esc(o.value)}">${esc(o.label)}</option>`).join("")}</select>`;
  else if (type === "textarea")
    input = `<textarea name="${name}" placeholder="${esc(placeholder)}" ${required ? "required" : ""}></textarea>`;
  else
    input = `<input name="${name}" type="${type}" placeholder="${esc(placeholder)}" ${required ? "required" : ""}>`;
  return `<div class="field"><label for="field-${name}">${esc(label)}</label>${input}</div>`;
}
function showModal(type) {
  modalType = type;
  const titles = {
    ticket: "Новое обращение",
    customer: "Новый клиент",
    equipment: "Новое оборудование",
  };
  document.querySelector("#modalTitle").textContent = titles[type];
  document.querySelector("#modalSubmit").textContent =
    type === "ticket" ? "Создать обращение" : "Сохранить";
  let fields = "";
  if (type === "ticket") {
    fields += field(
      "title",
      "Тема обращения",
      "text",
      null,
      "Например, ошибка фрезерного станка",
    );
    fields += field(
      "customerId",
      "Клиент",
      "select",
      db.customers.map((c) => ({ value: c.id, label: c.name })),
    );
    fields += field(
      "equipmentId",
      "Оборудование",
      "select",
      [
        { value: "", label: "Не выбрано" },
        ...db.equipment.map((e) => ({
          value: e.id,
          label: `${e.name} — ${e.model}`,
        })),
      ],
      null,
      false,
    );
    fields += field(
      "priority",
      "Приоритет",
      "select",
      Object.entries(priorityLabels).map(([value, label]) => ({
        value,
        label,
      })),
    );
    fields += field(
      "description",
      "Описание проблемы",
      "textarea",
      null,
      "Что произошло? Какие ошибки отображаются?",
    );
    fields += field(
      "initialMessage",
      "Первое сообщение (необязательно)",
      "textarea",
      null,
      "Сообщение клиента или заметка",
      false,
    );
  } else if (type === "customer") {
    fields += field(
      "name",
      "Название организации",
      "text",
      null,
      "Например, Стоматология Дентал",
    );
    fields += field(
      "contact",
      "Контактное лицо",
      "text",
      null,
      "Имя и фамилия",
    );
    fields += field("phone", "Телефон", "tel", null, "+7 ...", false);
    fields += field("email", "Email", "email", null, "name@clinic.ru", false);
    fields += field("city", "Город", "text", null, "Калининград", false);
  } else {
    fields += field(
      "customerId",
      "Клиент",
      "select",
      db.customers.map((c) => ({ value: c.id, label: c.name })),
    );
    fields += field(
      "name",
      "Тип оборудования",
      "text",
      null,
      "Например, Фрезерный станок",
    );
    fields += field("model", "Модель", "text", null, "Производитель и модель");
    fields += field(
      "serial",
      "Серийный номер",
      "text",
      null,
      "Серийный номер",
      false,
    );
    fields += field("purchaseDate", "Дата покупки", "date", null, "", false);
    fields += field("warranty", "Гарантия до", "date", null, "", false);
  }
  document.querySelector("#modalFields").innerHTML = fields;
  document.querySelector("#modalBackdrop").classList.remove("hidden");
  document.body.style.overflow = "hidden";
  document
    .querySelector(
      "#modalFields input, #modalFields select, #modalFields textarea",
    )
    ?.focus();
}
function closeModal() {
  document.querySelector("#modalBackdrop").classList.add("hidden");
  document.body.style.overflow = "";
  document.querySelector("#modalForm").reset();
  modalType = null;
}
function handleModalSubmit(event) {
  event.preventDefault();
  const form = new FormData(event.currentTarget),
    v = Object.fromEntries(form.entries());
  if (modalType === "ticket") {
    const id = `DS-${db.nextTicket++}`,
      message = (
        v.initialMessage || "Обращение создано сотрудником техподдержки"
      ).trim();
    db.tickets.unshift({
      id,
      title: v.title.trim(),
      customerId: v.customerId,
      equipmentId: v.equipmentId || "",
      description: v.description.trim(),
      status: "open",
      priority: v.priority || "normal",
      createdAt: stamp(),
      updatedAt: stamp(),
      messages: [{ from: "agent", text: message, time: nowText() }],
    });
    closeModal();
    save();
    toast(`Создано обращение ${id}`);
    openTicket(id);
  } else if (modalType === "customer") {
    const id = `C-${String(db.nextCustomer++).padStart(3, "0")}`;
    db.customers.push({
      id,
      name: v.name.trim(),
      contact: v.contact.trim(),
      phone: v.phone.trim(),
      email: v.email.trim(),
      city: v.city.trim(),
    });
    closeModal();
    save();
    toast("Клиент добавлен");
  } else if (modalType === "equipment") {
    const id = `EQ-${String(db.nextEquipment++).padStart(3, "0")}`;
    db.equipment.push({
      id,
      customerId: v.customerId,
      name: v.name.trim(),
      model: v.model.trim(),
      serial: v.serial.trim(),
      purchaseDate: v.purchaseDate,
      warranty: v.warranty,
    });
    closeModal();
    save();
    toast("Оборудование добавлено");
  }
}
document
  .querySelectorAll(".nav-item")
  .forEach((b) => b.addEventListener("click", () => showView(b.dataset.view)));
document.querySelector("#ticketRows").addEventListener("click", (e) => {
  const tr = e.target.closest("tr[data-ticket-id]");
  if (tr) openTicket(tr.dataset.ticketId);
});
document.querySelector("#ticketFilters").addEventListener("click", (e) => {
  const b = e.target.closest("[data-filter]");
  if (!b) return;
  currentFilter = b.dataset.filter;
  document
    .querySelectorAll(".tab")
    .forEach((t) => t.classList.toggle("active", t === b));
  renderTickets();
});
document
  .querySelector("#ticketSearch")
  .addEventListener("input", renderTickets);
document.querySelector("#globalSearch").addEventListener("input", () => {
  showView("inbox");
  renderTickets();
});
document
  .querySelector("#customerSearch")
  .addEventListener("input", renderCustomers);
document
  .querySelector("#equipmentSearch")
  .addEventListener("input", renderEquipment);
document
  .querySelector("#newTicketBtn")
  .addEventListener("click", () => showModal("ticket"));
document
  .querySelector("#newCustomerBtn")
  .addEventListener("click", () => showModal("customer"));
document
  .querySelector("#newEquipmentBtn")
  .addEventListener("click", () => showModal("equipment"));
document.querySelector("#closeDetail").addEventListener("click", closeTicket);
document.querySelector("#ticketOverlay").addEventListener("click", (e) => {
  if (e.target.id === "ticketOverlay") closeTicket();
});
document.querySelector("#closeModal").addEventListener("click", closeModal);
document.querySelector("#cancelModal").addEventListener("click", closeModal);
document.querySelector("#modalBackdrop").addEventListener("click", (e) => {
  if (e.target.id === "modalBackdrop") closeModal();
});
document
  .querySelector("#modalForm")
  .addEventListener("submit", handleModalSubmit);
document
  .querySelector("#detailStatusSelect")
  .addEventListener("change", (e) => {
    const t = ticketById(selectedTicketId);
    if (t) {
      t.status = e.target.value;
      t.updatedAt = stamp();
      save();
      toast("Статус обновлён");
    }
  });
document
  .querySelector("#detailPrioritySelect")
  .addEventListener("change", (e) => {
    const t = ticketById(selectedTicketId);
    if (t) {
      t.priority = e.target.value;
      t.updatedAt = stamp();
      save();
      toast("Приоритет обновлён");
    }
  });
document.querySelector("#replyForm").addEventListener("submit", (e) => {
  e.preventDefault();
  const t = ticketById(selectedTicketId),
    input = document.querySelector("#replyInput"),
    text = input.value.trim();
  if (!t || !text) return;
  t.messages.push({ from: "agent", text, time: nowText() });
  t.updatedAt = stamp();
  if (t.status === "open") t.status = "progress";
  input.value = "";
  save();
  toast("Ответ добавлен в историю");
});
document.querySelector("#deleteTicketBtn").addEventListener("click", () => {
  const t = ticketById(selectedTicketId);
  if (!t) return;
  if (confirm(`Удалить обращение ${t.id}? Это действие нельзя отменить.`)) {
    db.tickets = db.tickets.filter((x) => x.id !== t.id);
    closeTicket();
    save();
    toast("Обращение удалено");
  }
});
document.querySelector("#exportBtn").addEventListener("click", () => {
  const rows = [
    [
      "ID",
      "Тема",
      "Клиент",
      "Оборудование",
      "Статус",
      "Приоритет",
      "Описание",
      "Обновлено",
    ],
    ...db.tickets.map((t) => [
      t.id,
      t.title,
      customerById(t.customerId)?.name || "",
      equipmentById(t.equipmentId)?.model || "",
      statusLabels[t.status],
      priorityLabels[t.priority],
      t.description,
      relativeDate(t.updatedAt),
    ]),
  ];
  const csv =
    "\uFEFF" +
    rows
      .map((row) =>
        row.map((v) => `"${String(v ?? "").replace(/"/g, '""')}"`).join(";"),
      )
      .join("\r\n");
  const url = URL.createObjectURL(
      new Blob([csv], { type: "text/csv;charset=utf-8;" }),
    ),
    a = document.createElement("a");
  a.href = url;
  a.download = "dental-support-tickets.csv";
  a.click();
  URL.revokeObjectURL(url);
  toast("CSV-файл подготовлен");
});
document.querySelector("#resetDemo").addEventListener("click", () => {
  if (confirm("Сбросить все локальные данные и восстановить демоверсию?")) {
    db = demoData();
    save();
    closeTicket();
    toast("Демоданные восстановлены");
  }
});
document
  .querySelector("#mobileMenu")
  .addEventListener("click", () =>
    document.querySelector("#sidebar").classList.toggle("mobile-open"),
  );
document.addEventListener("keydown", (e) => {
  if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
    e.preventDefault();
    document.querySelector("#globalSearch").focus();
  }
  if (e.key === "Escape") {
    if (!document.querySelector("#modalBackdrop").classList.contains("hidden"))
      closeModal();
    else if (
      !document.querySelector("#ticketOverlay").classList.contains("hidden")
    )
      closeTicket();
    document.querySelector("#sidebar").classList.remove("mobile-open");
  }
});
renderAll();
