const STORE = {
  currentSection: "notes",
  notes: [
    {
      id: uuidv4(),
      title: "A note",
      body: "A content",
      color: "white",
      deleted: false,
    },
    {
      id: uuidv4(),
      title: "A note",
      body: "A content",
      color: "white",
      deleted: false,
    },
    {
      id: uuidv4(),
      title: "A note",
      body: "A content",
      color: "white",
      deleted: false,
    },
    {
      id: uuidv4(),
      title: "A note",
      body: "A content",
      color: "white",
      deleted: false,
    },
    {
      id: uuidv4(),
      title: "A note",
      body: "A content",
      color: "white",
      deleted: false,
    },
    {
      id: uuidv4(),
      title: "A note",
      body: "A content",
      color: "white",
      deleted: false,
    },
    {
      id: uuidv4(),
      title: "A note",
      body: "A content",
      color: "white",
      deleted: false,
    },
    {
      id: uuidv4(),
      title: "A note",
      body: "A content",
      color: "white",
      deleted: false,
    },
    {
      id: uuidv4(),
      title: "A note",
      body: "A content",
      color: "white",
      deleted: false,
    },
    {
      id: uuidv4(),
      title: "A note",
      body: "A content",
      color: "white",
      deleted: false,
    },
  ],
};

/*
 *
 * Render
 *
 */
function renderNote(note, isTrashed) {
  let footer = `<footer>
    <div class="tooltip">
      <input type="hidden" name="color" />
      <a class="tooltip-trigger" href="#color">
        <i class="ri-palette-fill"></i>
      </a>
      <div class="tooltip-content hidden">
        <div class="tooltip-content__body">
          <div
            data-color="white"
            class="tooltip-option tooltip-option--white"
          ></div>
          <div
            data-color="red"
            class="tooltip-option tooltip-option--red"
          ></div>
          <div
            data-color="orange"
            class="tooltip-option tooltip-option--orange"
          ></div>
          <div
            data-color="yellow"
            class="tooltip-option tooltip-option--yellow"
          ></div>
          <div
            data-color="green"
            class="tooltip-option tooltip-option--green"
          ></div>
          <div
            data-color="turquoise"
            class="tooltip-option tooltip-option--turquoise"
          ></div>
          <div
            data-color="cyan"
            class="tooltip-option tooltip-option--cyan"
          ></div>
          <div
            data-color="blue"
            class="tooltip-option tooltip-option--blue"
          ></div>
          <div
            data-color="purple"
            class="tooltip-option tooltip-option--purple"
          ></div>
          <div
            data-color="pink"
            class="tooltip-option tooltip-option--pink"
          ></div>
        </div>
      </div>
    </div>
    <div class="trash">
      <a class="trash-trigger" href="#trash">
        <i class="ri-delete-bin-fill"></i>
      </a>
    </div>
  </footer>`;

  if (isTrashed) {
    footer = `<footer>
      <div class="delete">
        <a class="delete-trigger" href="#delete">
          <i class="ri-delete-bin-fill"></i>
        </a>
      </div>
      <div class="restore">
        <a class="restore-trigger" href="#restore">
        <i class="ri-arrow-go-back-fill"></i>
        </a>
      </div>
    </footer>`;
  }

  return `<li class="note" style="background-color: var(--${note.color})" data-id="${note.id}">
    <h3 class="note-title">${note.title}</h3>
    <p class="note-body">${note.body}</p>
    ${footer}
  </li>`;
}

function renderNotes() {
  const notes = STORE.notes.filter((note) => !note.deleted);
  if (notes.length === 0)
    return `<div class="notes notes--no-content"><h2>No notes to keep</h2></div>`;
  return `<div class="notes"><ul>${notes
    .map((note) => renderNote(note))
    .join("")}</ul></div>`;
}

function renderTrashNotes() {
  const notes = STORE.notes.filter((note) => note.deleted);
  if (notes.length === 0)
    return `<div class="notes notes--no-content"><h2>No trash notes to show</h2></div>`;
  return `<div class="notes"><ul>${notes
    .map((note) => renderNote(note, true))
    .join("")}</ul></div>`;
}

function setSelectedAsideItem() {
  const items = document.querySelectorAll(".aside li");
  const selectedItem = Array.from(items).find(
    (item) => item.dataset.value === STORE.currentSection
  );
  items.forEach((item) => item.classList.remove("selected"));
  selectedItem.classList.add("selected");
}

function renderContent() {
  let html = "";
  setSelectedAsideItem();
  switch (STORE.currentSection) {
    case "trash":
      html = renderTrashNotes();
      break;
    default:
      html = renderNotes();
  }
  const container = document.querySelector(".js-content");
  container.innerHTML = html;
}

/*
 *
 * Listeners
 *
 */
function addContentDeleteListeners() {
  const container = document.querySelector(".js-content");
  container.addEventListener("click", (e) => {
    const trashBins = container.querySelectorAll(".delete-trigger");
    trashBins.forEach((trashBin) => {
      if (trashBin === e.target) {
        e.preventDefault();
        const parentNote = trashBin.closest(".note");
        parentNote.classList.add("trashOut");
        parentNote.addEventListener("animationend", (e) => {
          renderContent();
        });
        STORE.notes = STORE.notes.filter(
          (note) => note.id !== parentNote.dataset.id
        );
      }
    });
  });
}

function addContentRestoreListeners() {
  const container = document.querySelector(".js-content");
  container.addEventListener("click", (e) => {
    const restoreArrows = container.querySelectorAll(".restore-trigger");
    restoreArrows.forEach((restoreArrow) => {
      if (restoreArrow === e.target) {
        e.preventDefault();
        const parentNote = restoreArrow.closest(".note");
        parentNote.classList.add("goBack");
        parentNote.addEventListener("animationend", (e) => {
          renderContent();
        });
        STORE.notes = STORE.notes.map((note) => {
          if (note.id === parentNote.dataset.id) {
            return { ...note, deleted: false };
          }
          return note;
        });
      }
    });
  });
}

function addContentTrashListeners() {
  const container = document.querySelector(".js-content");
  container.addEventListener("click", (e) => {
    const trashBins = container.querySelectorAll(".trash-trigger");
    trashBins.forEach((trashBin) => {
      if (trashBin === e.target) {
        e.preventDefault();
        const parentNote = trashBin.closest(".note");
        parentNote.classList.add("shrinkOut");
        parentNote.addEventListener("animationend", (e) => {
          renderContent();
        });
        STORE.notes = STORE.notes.map((note) => {
          if (note.id === parentNote.dataset.id) {
            return { ...note, deleted: true };
          }
          return note;
        });
      }
    });
  });
}

function addContentTooltipListeners() {
  const container = document.querySelector(".js-content");
  container.addEventListener("mouseover", (e) => {
    const tooltips = container.querySelectorAll(".tooltip");
    tooltips.forEach((tooltip) => {
      const trigger = tooltip.querySelector(".tooltip-trigger");
      const content = tooltip.querySelector(".tooltip-content");
      const onMouseLeave = (e) => {
        if (tooltip === e.target) {
          tooltip.removeEventListener("mouseleave", onMouseLeave);
          content.classList.add("hidden");
        }
      };
      if (trigger === e.target) {
        content.classList.remove("hidden");
        tooltip.addEventListener("mouseleave", onMouseLeave);
      }
    });
  });
  container.addEventListener("click", (e) => {
    const triggers = container.querySelectorAll(".tooltip-option");
    triggers.forEach((trigger) => {
      if (trigger === e.target) {
        e.preventDefault();
        STORE.notes = STORE.notes.map((note) => {
          if (note.id === trigger.closest(".note").dataset.id) {
            return { ...note, color: trigger.dataset.color };
          }
          return note;
        });
        renderContent();
      }
    });
  });
}

function addFormTooltipListener() {
  const tooltip = document.querySelector(".js-note-form .tooltip");
  tooltip.addEventListener("mouseover", (e) => {
    const trigger = tooltip.querySelector(".tooltip-trigger");
    const content = tooltip.querySelector(".tooltip-content");
    const onMouseLeave = (e) => {
      if (tooltip === e.target) {
        tooltip.removeEventListener("mouseleave", onMouseLeave);
        content.classList.add("hidden");
      }
    };
    if (trigger === e.target) {
      content.classList.remove("hidden");
      tooltip.addEventListener("mouseleave", onMouseLeave);
    }
  });
  tooltip.addEventListener("click", (e) => {
    const form = document.querySelector(".js-note-form");
    const triggers = tooltip.querySelectorAll(".tooltip-option");
    triggers.forEach((trigger) => {
      if (trigger === e.target) {
        e.preventDefault();
        const input = trigger
          .closest(".tooltip")
          .querySelector("input[name=color]");
        input.value = trigger.dataset.color;
        form.style.backgroundColor = `var(--${trigger.dataset.color})`;
      }
    });
  });
}

function listenNoteFormSubmit() {
  const form = document.querySelector(".js-note-form");
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const { title, body, color } = e.target;
    STORE.notes.push({
      id: uuidv4(),
      title: title.value,
      body: body.value,
      color: color.value,
    });
    e.target.reset();
    e.target.style.backgroundColor = "";
    renderContent();
  });
}

function listenAsideClick() {
  const anchors = document.querySelectorAll(".aside a");
  anchors.forEach((anchor) => {
    anchor.addEventListener("click", (e) => {
      e.preventDefault();
      STORE.currentSection = anchor.closest("li").dataset.value;
      renderContent();
    });
  });
}

/*
 *
 * Main Functions
 *
 */
function addEventListeners() {
  addContentDeleteListeners();
  addContentRestoreListeners();
  addContentTrashListeners();
  addContentTooltipListeners();
  addFormTooltipListener();
  listenNoteFormSubmit();
  listenAsideClick();
}

function init() {
  renderContent();
  addEventListeners();
}

init();
