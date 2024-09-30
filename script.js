document.addEventListener('DOMContentLoaded', () => {
    const inputField = document.getElementById('button-text');
    const addButton = document.getElementById('add-button');
    const editModeButton = document.getElementById('edit-mode-button');
    const buttonsContainer = document.getElementById('buttons-container');
    const errorMessage = document.getElementById('error-message');
    let editMode = false;
    let selectedButton = null;

    // Добавление новой кнопки
    addButton.addEventListener('click', () => {
        const buttonText = inputField.value.trim();

        // Проверка на пустой инпут
        if (buttonText === '') {
            showError();
            return;
        }

        // Создание новой кнопки
        createButton(buttonText);
        
        // Очистка поля ввода и скрытие ошибки
        inputField.value = '';
        hideError();
    });

    // Функция для создания новой кнопки
    function createButton(text) {
        const newButton = document.createElement('button');
        newButton.classList.add('generated-button');
        newButton.textContent = text;

        // Обработчик клика для режима редактирования
        newButton.addEventListener('click', () => {
            if (editMode) {
                handleEditMode(newButton);
            }
        });

        buttonsContainer.appendChild(newButton);
    }

    // Функция для включения/выключения режима редактирования
    editModeButton.addEventListener('click', () => {
        editMode = !editMode;

        const buttons = document.querySelectorAll('.generated-button');
        buttons.forEach(button => {
            if (editMode) {
                button.classList.add('shake');
            } else {
                button.classList.remove('shake');
            }
        });

        // Если выключаем режим редактирования, сбрасываем выбранную кнопку
        if (!editMode) {
            selectedButton = null;
        }
    });

    // Функция для обработки выбора кнопки в режиме редактирования
    function handleEditMode(button) {
        selectedButton = button;

        // Создаем панель с опциями (удалить, редактировать)
        const optionsDiv = document.createElement('div');
        optionsDiv.classList.add('options-panel');

        const editInput = document.createElement('input');
        editInput.type = 'text';
        editInput.value = button.textContent;

        const saveButton = document.createElement('button');
        saveButton.textContent = 'Сохранить';

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Удалить';

        // Обработчик удаления
        deleteButton.addEventListener('click', () => {
            buttonsContainer.removeChild(button);
            buttonsContainer.removeChild(optionsDiv);
        });

        // Обработчик сохранения редактирования
        saveButton.addEventListener('click', () => {
            const newText = editInput.value.trim();
            if (newText !== '') {
                button.textContent = newText;
            }
            buttonsContainer.removeChild(optionsDiv);
        });

        // Добавляем элементы в панель
        optionsDiv.appendChild(editInput);
        optionsDiv.appendChild(saveButton);
        optionsDiv.appendChild(deleteButton);

        // Добавляем панель под выбранную кнопку
        buttonsContainer.appendChild(optionsDiv);
    }

    // Функция для отображения ошибки
    function showError() {
        errorMessage.classList.remove('hidden');
        inputField.classList.add('error-border');
    }

    // Функция для скрытия ошибки
    function hideError() {
        errorMessage.classList.add('hidden');
        inputField.classList.remove('error-border');
    }
});
