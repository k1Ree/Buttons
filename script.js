document.addEventListener('DOMContentLoaded', function () {
    const input = document.getElementById('input-text');
    const addButton = document.getElementById('add-button');
    const deleteModeButton = document.getElementById('delete-mode-button');
    const buttonsContainer = document.getElementById('buttons-container');
    let deleteMode = false;

    // Добавление новой кнопки
    addButton.addEventListener('click', function () {
        const text = input.value.trim();
        
        if (text === '') {
            alert('Введите текст для кнопки!');
            return;
        }

        // Создание кнопки
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
                const newText = prompt('Редактировать текст кнопки:', newButton.textContent);
                if (newText !== null) {
                    newButton.textContent = newText;
                    newButton.appendChild(deleteBtn); // Снова добавляем крестик
                }
            }
        });

        // Добавляем кнопку на страницу
        buttonsContainer.appendChild(newButton);

        // Очищаем инпут
        input.value = '';
    });

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
