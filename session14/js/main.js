(function() {
    let btn = document.getElementById("play"),
      secondBlock = document.querySelector("#second-line"),
      last = document.getElementById("last"),
      template,
      lastElement,
      viewArray = [],
      hiddenArray = data.slice(),
      innerGalery;
  
    last.innerHTML = hiddenArray.length;
  
    //обрезаем знаки
    function strSlice(str) {
      if (str.length > 15) {
        str = str.slice(0, 15);
      }
      return str;
    }
    //конвертирование даты
    function newDate(date) {
      var tmpDate = new Date(date);
      return (
        tmpDate.getFullYear() +
        "/" +
        addZero(tmpDate.getMonth() + 1) +
        "/" +
        tmpDate.getDate() +
        " " +
        addZero(tmpDate.getHours()) +
        ":" +
        addZero(tmpDate.getMinutes())
      );
    }
  
    //добавляем 0
    function addZero(num) {
      if (num < 10) {
        num = "0" + num;
      }
      return num;
    }
    //модальное окно бутсрапа
    function modal() {
      const modalWindow = document.getElementById("modals");
      const closeBtn = document.querySelector("#closeRedBtn");
  
      modalWindow.classList.toggle("show");
      closeBtn.addEventListener("click", () => {
        modalWindow.classList.remove("show");
      });
    }
    //выключаем кнопку и меняем цвет
    function disabledEl(elements) {
      if (elements === 0) {
        btn.style.backgroundColor = "grey";
        btn.setAttribute("disabled", "disabled");
        modal();
      } else {
        btn.removeAttribute("style", "backgroundColor");
        btn.removeAttribute("disabled");
      }
    }
  
    //скрытый массив с данными
    function hiddenData() {
      lastElement = hiddenArray.pop(); //вырезаю последний элемент массива
    }
  
    //открытый массив с данными для отображения
    function viewData() {
      hiddenData();
      viewArray.push(lastElement); //добавляем в конец массива
      disabledEl(hiddenArray.length);
      render();
    }
    //удаляем элемент массива
  
    function deleteItem(e) {
      let removeElement;
  
      if (e.target.innerHTML === "Удалить") {
        let elementName = e.target.parentNode.getAttribute("data-name"); //находим имя элемента
        removeElement = viewArray.find(item => {
          //ищем данный элемент в массиве для отображения и удалем его
          return item.name === elementName;
        });
  
        hiddenArray.push(removeElement);
  
        if (removeElement) {
          viewArray = viewArray.filter(el => {
            return el.id !== removeElement.id;
          });
          render();
        }
      }
      disabledEl(hiddenArray.length);
    }
  
    secondBlock.addEventListener("click", deleteItem);
  
    //отображаем галерею
  
    function render() {
      last.innerHTML = hiddenArray.length;
      let template = "";
      viewArray.forEach(item => {
        template += `<div class="col-sm-3 col-xs-6" data-name='${item.name}'>\
                     <img src="${"http://" + item.url}" alt="${
          item.name
        }" class="img-thumbnail">\
                     <div class="info-wrapper">\
                     <div class="text-muted text-center">${item.name}</div>\
                     <div class="text-muted top-padding text-center">${strSlice(
                       item.description
                     )}</div>\
                     <div class="text-muted text-center">${newDate(
                       item.date
                     )}</div>\
                     </div>\
                     <div class="btn btn-danger text-center">Удалить</div>\
                     <br /><br />\
                     </div>`;
      });
      secondBlock.innerHTML = template;
    }
  
    btn.addEventListener("click", viewData);
  })();