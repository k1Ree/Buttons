document.addEventListener('DOMContentLoaded', function () {
    const input = document.getElementById('input-text');
    const addButton = document.getElementById('add-button');
    const deleteModeButton = document.getElementById('delete-mode-button');
    const buttonsContainer = document.getElementById('buttons-container');
    
    // Элементы редактирования
    const editSection = document.getElementById('edit-section');
    const editInput = document.getElementById('edit-input');
    const saveEditButton = document.getElementById('save-edit-button');
    const cancelEditButton = document.getElementById('cancel-edit-button');
    
    let deleteMode = false;
    let editingButton = null; // Кнопка, которую мы редактируем

    // Функция проверки уникальности текста кнопки
    function isButtonTextUnique(text) {
        const buttons = document.querySelectorAll('.generated-button');
        return !Array.from(buttons).some(button => button.textContent.replace('Редактировать', '').trim() === text);
    }

    // Добавление новой кнопки
    addButton.addEventListener('click', function () {
        const text = input.value.trim();
        
        if (text === '') {
            alert('Введите текст для кнопки!');
            return;
        }

        if (!isButtonTextUnique(text)) {
            alert('Кнопка с таким текстом уже существует!');
            return;
        }

        // Создание кнопки
        createButton(text);

        // Очищаем инпут
        input.value = '';
    });

    // Функция создания кнопки
    function createButton(text) {
        const newButton = document.createElement('div');
        newButton.classList.add('generated-button');
        
        const buttonLabel = document.createElement('span');
        buttonLabel.textContent = text;

        const editBtn = document.createElement('button');
        editBtn.textContent = 'Редактировать';
        editBtn.classList.add('edit-btn');

        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'x';
        deleteBtn.classList.add('edit');
        
        // Добавляем элементы в кнопку
        newButton.appendChild(buttonLabel);
        newButton.appendChild(editBtn);
        newButton.appendChild(deleteBtn);

        // Добавляем обработчик для удаления кнопки
        deleteBtn.addEventListener('click', function (e) {
            e.stopPropagation();
            buttonsContainer.removeChild(newButton);
        });

        // Обработчик для редактирования текста кнопки
        editBtn.addEventListener('click', function (e) {
            e.stopPropagation();
            if (!deleteMode) {
                editingButton = newButton;
                editInput.value = buttonLabel.textContent;
                editSection.style.display = 'block';
            }
        });

        // Добавляем кнопку на страницу
        buttonsContainer.appendChild(newButton);
    }

    // Включение/выключение режима удаления
    deleteModeButton.addEventListener('click', function () {
        deleteMode = !deleteMode;
        const buttons = document.querySelectorAll('.generated-button');
        
        buttons.forEach(button => {
            if (deleteMode) {
                button.classList.add('shake', 'edit-mode');
            } else {
                button.classList.remove('shake', 'edit-mode');
            }
        });
    });

    // Сохранение изменений текста кнопки
    saveEditButton.addEventListener('click', function () {
        const newText = editInput.value.trim();
        
        if (newText === '') {
            alert('Текст не может быть пустым!');
            return;
        }

        if (!isButtonTextUnique(newText)) {
            alert('Кнопка с таким текстом уже существует!');
            return;
        }

        // Обновляем текст кнопки
        const buttonLabel = editingButton.querySelector('span');
        buttonLabel.textContent = newText;

        // Скрываем секцию редактирования
        editSection.style.display = 'none';
        editingButton = null;
    });

    // Отмена редактирования
    cancelEditButton.addEventListener('click', function () {
        editSection.style.display = 'none';
        editingButton = null;
    });
});
