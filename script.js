document.addEventListener('DOMContentLoaded', function () {
    const input = document.getElementById('input-text');
    const addButton = document.getElementById('add-button');
    const deleteModeButton = document.getElementById('delete-mode-button');
    const buttonsContainer = document.getElementById('buttons-container');
    let deleteMode = false;

    // Функция проверки уникальности текста кнопки
    function isButtonTextUnique(text) {
        const buttons = document.querySelectorAll('.generated-button');
        return !Array.from(buttons).some(button => button.textContent.trim() === text);
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
        const newButton = document.createElement('button');
        newButton.classList.add('generated-button');
        newButton.textContent = text;

        // Создание кнопки удаления (крестик)
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'x';
        deleteBtn.classList.add('edit');
        
        // Добавление крестика к кнопке
        newButton.appendChild(deleteBtn);

        // Добавляем обработчик для удаления кнопки
        deleteBtn.addEventListener('click', function (e) {
            e.stopPropagation();
            buttonsContainer.removeChild(newButton);
        });

        // Добавляем возможность редактирования текста кнопки
        newButton.addEventListener('click', function () {
            if (!deleteMode) {
                const currentText = newButton.textContent.replace('x', '').trim(); // Получаем текст без "крестика"
                const newText = prompt('Редактировать текст кнопки:', currentText);
                
                if (newText !== null && newText.trim() !== '') {
                    const trimmedNewText = newText.trim();
                    
                    // Проверяем, уникален ли новый текст
                    if (isButtonTextUnique(trimmedNewText)) {
                        newButton.textContent = trimmedNewText;
                        newButton.appendChild(deleteBtn); // Снова добавляем крестик
                    } else {
                        alert('Кнопка с таким текстом уже существует!');
                    }
                }
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
});
