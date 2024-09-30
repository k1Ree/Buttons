document.addEventListener('DOMContentLoaded', function () {
    const inputField = document.getElementById('button-text');
    const addButton = document.getElementById('add-button');
    const buttonsContainer = document.getElementById('buttons-container');
    const errorMessage = document.getElementById('error-message');
    const editModeButton = document.getElementById('edit-mode-button');
    
    let editMode = false;
    let currentlyEditing = null;

    // Добавление кнопки
    addButton.addEventListener('click', function () {
        const text = inputField.value.trim();
        
        // Проверка на пустой инпут
        if (text === '') {
            inputField.classList.add('error');
            errorMessage.classList.remove('hidden');
            return;
        }
        
        // Создаем новую кнопку
        createButton(text);
        
        // Очищаем инпут и убираем ошибку
        inputField.value = '';
        inputField.classList.remove('error');
        errorMessage.classList.add('hidden');
    });

    // Функция создания новой кнопки
    function createButton(text) {
        const newButton = document.createElement('div');
        newButton.classList.add('generated-button');
        newButton.textContent = text;
        
        // Кнопка редактирования
        const editBtn = document.createElement('button');
        editBtn.textContent = '✏️';
        editBtn.classList.add('edit-btn');
        newButton.appendChild(editBtn);

        // Кнопка удаления
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = '❌';
        deleteBtn.classList.add('delete-btn');
        newButton.appendChild(deleteBtn);

        // Добавление инпута для редактирования
        const editInput = document.createElement('input');
        editInput.classList.add('edit-input');
        editInput.style.display = 'none';
        newButton.appendChild(editInput);

        // Обработчик для удаления кнопки
        deleteBtn.addEventListener('click', function () {
            buttonsContainer.removeChild(newButton);
        });

        // Обработчик для редактирования текста кнопки
        editBtn.addEventListener('click', function () {
            editInput.value = newButton.textContent;
            editInput.style.display = 'block';
            currentlyEditing = newButton;
        });

        // Когда изменен текст кнопки
        editInput.addEventListener('keypress', function (e) {
            if (e.key === 'Enter') {
                newButton.textContent = editInput.value;
                newButton.appendChild(editBtn);
                newButton.appendChild(deleteBtn);
                editInput.style.display = 'none';
                currentlyEditing = null;
            }
        });

        buttonsContainer.appendChild(newButton);
    }

    // Включение/выключение режима редактирования
    editModeButton.addEventListener('click', function () {
        editMode = !editMode;
        const buttons = document.querySelectorAll('.generated-button');
        
        buttons.forEach(button => {
            if (editMode) {
                button.classList.add('shake');
                button.querySelector('.edit-btn').style.display = 'inline-block';
                button.querySelector('.delete-btn').style.display = 'inline-block';
            } else {
                button.classList.remove('shake');
                button.querySelector('.edit-btn').style.display = 'none';
                button.querySelector('.delete-btn').style.display = 'none';
            }
        });
    });
});
