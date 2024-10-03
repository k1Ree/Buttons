const buttonsContainer = document.getElementById('buttonsContainer');
const addButton = document.getElementById('addButton');
const buttonText = document.getElementById('buttonText');
const buttonUrl = document.getElementById('buttonUrl');
const toggleEditMode = document.getElementById('toggleEditMode');
const adminPanel = document.getElementById('adminPanel');
const loginBtn = document.getElementById('loginBtn');
const passwordInput = document.getElementById('passwordInput');
const errorMsg = document.getElementById('errorMsg');
const app = document.getElementById('app');

let isEditMode = false;
let buttons = [];

// Загрузка кнопок из Local Storage при загрузке страницы
window.onload = () => {
    const savedButtons = JSON.parse(localStorage.getItem('buttons')) || [];
    savedButtons.forEach(btn => {
        createButton(btn.text, btn.url);
    });
    buttons = savedButtons;
};

// Добавление новой кнопки
addButton.addEventListener('click', () => {
    const text = buttonText.value.trim();
    const url = buttonUrl.value.trim();

    if (text === '' || url === '') {
        buttonText.classList.add('error');
        buttonUrl.classList.add('error');
        return;
    }

    if (buttons.some(btn => btn.text === text)) {
        alert('Текст кнопки должен быть уникальным!');
        return;
    }

    buttonText.classList.remove('error');
    buttonUrl.classList.remove('error');
    createButton(text, url);
    buttons.push({ text, url });
    saveButtonsToLocalStorage();
    buttonText.value = '';
    buttonUrl.value = '';
});

// Создание кнопки
function createButton(text, url) {
    const button = document.createElement('button');
    button.textContent = text;
    button.classList.add('editableButton');
    
    // В режиме редактирования
    button.addEventListener('click', () => {
        if (isEditMode) {
            const editInput = document.createElement('input');
            editInput.type = 'text';
            editInput.classList.add('edit-input');
            editInput.value = button.textContent;

            button.replaceWith(editInput);
            editInput.focus();

            // Редактирование текста кнопки в реальном времени
            editInput.addEventListener('input', () => {
                const newText = editInput.value.trim();
                if (newText && !buttons.some(b => b.text === newText)) {
                    button.textContent = newText;
                    updateButtonInLocalStorage(text, newText, url);
                    text = newText; // обновляем текст кнопки
                }
            });

            editInput.addEventListener('blur', () => {
                editInput.replaceWith(button);
            });
        } else {
            window.open(url, '_blank');
        }
    });

    // Удаление кнопки через крестик
    const deleteBtn = document.createElement('span');
    deleteBtn.textContent = '✖';
    deleteBtn.classList.add('deleteBtn');
    deleteBtn.addEventListener('click', (e) => {
        e.stopPropagation();  // Остановка всплытия события, чтобы не вызывать редактирование
        buttons = buttons.filter(b => b.text !== button.textContent);
        buttonsContainer.removeChild(button);
        saveButtonsToLocalStorage();
    });

    button.appendChild(deleteBtn);
    buttonsContainer.appendChild(button);
}

// Сохранение кнопок в Local Storage
function saveButtonsToLocalStorage() {
    localStorage.setItem('buttons', JSON.stringify(buttons));
}

// Обновление текста кнопки в Local Storage
function updateButtonInLocalStorage(oldText, newText, newUrl) {
    buttons = buttons.map(b => b.text === oldText ? { ...b, text: newText, url: newUrl } : b);
    saveButtonsToLocalStorage();
}

// Вход в режим редактирования через админ-панель
loginBtn.addEventListener('click', () => {
    const password = passwordInput.value;
    if (password === '1234') {
        adminPanel.classList.add('hidden');
        app.classList.remove('hidden');
    } else {
        errorMsg.classList.remove('hidden');
    }
});

// Переключение режима редактирования
toggleEditMode.addEventListener('click', () => {
    isEditMode = !isEditMode;

    const buttons = document.querySelectorAll('.editableButton');
    buttons.forEach(button => {
        if (isEditMode) {
            button.classList.add('editing');
        } else {
            button.classList.remove('editing');
        }
    });

    const deleteBtns = document.querySelectorAll('.deleteBtn');
    deleteBtns.forEach(btn => {
        btn.classList.toggle('hidden', !isEditMode);
    });

    toggleEditMode.textContent = isEditMode ? 'Отключить режим редактирования' : 'Включить режим редактирования';
});