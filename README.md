# 한식 메뉴를 렌더링 해보기
주어진 데이터를 가지고, 데이터를 화면에 표시했다. 메뉴판 느낌으로 스타일링하고, 각 객체의 가격, 카테고리, 설명을 함께 기재했다.

## 특징
  - 각 메뉴를 카테고리 별대로 볼 수 있도록 하는 기능을 추가했다. (드롭다운 메뉴)
  - 음식을 bootstrap에서 가져온 cards 코드를 이용해 정갈하게 나열했다.
  - `filter`과 `includes` 메소드를 이용해서 특정 키워드를 사용자가 입력한 후 검색버튼을 누르면 검색어를 포함한 메뉴가 보이도록 하는 기능을 추가했다.


### 요소 추가 기능 방법
  1) `createElement`와 `appendChild`를 사용: 각 요소를 개별적으로 생성하고, 이를 부모 요소에 하나씩 추가할 수 있음.
      ```js
      // 부모 요소를 선택합니다.
      const parentElement = document.getElementById('parent');

      // 새로운 요소를 생성합니다.
      const newElement = document.createElement('div');
      newElement.textContent = '새로운 요소';

      // 부모 요소에 자식 요소를 추가합니다.
      parentElement.appendChild(newElement);

      ```
      - 여러 요소를 한 번에 추가하는 경우 `appendchild`를 여러 번 호출하는 것이 `innerHTML`보다 성능이 좋을 수 있음. 
      - 하지만, 코드가 다소 장황할 수 있고, 요소를 하나씩 생성하고, 추가해야함으로 코드가 길어질 수 있음.

  2) `innerHTML` 사용: 전체 HTML 구조를 문자열로 생성하여 한번에 삽입 (내가 사용한 방법)

      ```js
      // 부모 요소를 선택합니다.
      const parentElement = document.getElementById('parent');

      // HTML 문자열을 생성합니다.
      parentElement.innerHTML = `
        <div>새로운 요소 1</div>
        <div>새로운 요소 2</div>
      `;

      ```

      - HTML 구조를 한 번에 문자열로 작성하기 떄문에 간결함.
      - 하지만 사용자 입력을 포함할 떄 XSS 공격에 취약할 수 있음(보안문제), `innerHTML`을 사용하면 기존의 모든 자식 요소가 제거되고, 새로운 내용이 삽입됨.(굳이 코드를 reset시킬 필요가 없는 것을 원하면 장점이 될수도...)
          - XSS(Cross-Site Scripting) 공격: 익의적인 사용자가 웹 애플리케이션에 스크립트를 삽입하여 다른 사용자에게 피해를 주는 공격. 입력처리 시 악성 스크립트를 실행시키는 방법.

  3) `createElement`와 `insertAdjacentElement` 사용: 요소를 특정 위치에 삽입할 수 있음. (예를 들어 `beforeend`를 사용하면 부모요소의 끝에 자식 추가 가능.)

        ```js
        // 부모 요소를 선택합니다.
        const parentElement = document.getElementById('parent');

        // 새로운 요소를 생성합니다.
        const newElement = document.createElement('div');
        newElement.textContent = '새로운 요소';

        // 요소를 특정 위치에 삽입합니다.
        parentElement.insertAdjacentElement('beforeend', newElement);
        ```

        - 요소를 부모 요소의 시작, 끝, 특정 요소의 앞 뒤 등 원하는 위치에 다양하게 삽입 가능.
            - 'beforebegin': 현재 요소 바로 앞에 삽입
            - 'afterbegin': 현재 요소의 첫 번째 자식으로 삽입
            - 'beforeend': 현재 요소의 마지막 자식으로 삽입
            - 'afterend': 현재 요소 바로 뒤에 삽입

        - 위치 지정 문자열이 다소 복잡할 수 있음.


### 주요 기능 설명, 코드

  1) 검색 기능: 사용자에게 `keyword`를 받아 검색 기능 제공

    ```js
    //키워드 별
    const keyword = document.getElementById("keyword");
    const searchBtn = document.querySelector(".search-btn");

    searchBtn.addEventListener("click", function () {
      sortMenu(4, keyword.value);
    });
    ```
      - `value`라는 속성은 HTML요소의 현재 값을 반환하거나 설정할 떄 사용. 주로 `<input>`,` <textarea>`, `<select>`와 같은 폼 요소에서 사용됨.

    ```js
          filteredItems = menuItems.filter(
        (item) =>
          item.name.includes(word) ||
          item.description.includes(word) ||
          item.category.includes(word) ||
          item.price.includes(word)
      );
    ```

    `filter()` : 주어진 배열의 일부에 대한 얕은 복사본(새로운 배열)을 생성함//원래 배열은 변경되지 않음!. 이 새롭게 만들어진 배열은 제공된 함수(predicate function)에 의해 구현된 테스트를 통과한 요소만을 갖음.
      ```js
        const numbers = [1, 2, 3, 4, 5];
        const evenNumbers = numbers.filter(num => num % 2 === 0);
        console.log(evenNumbers); // [2, 4]
      ```

    `includes()`: 배열이나 문자열이 특정 값을 포함하고 있는지 여부를 확인.(즉, 참과 거짓을 반환함. boolean 값) 
      ```js
      const sentence = 'The quick brown fox';
      console.log(sentence.includes('quick')); // true
      console.log(sentence.includes('lazy'));  // false
      ```

  2) 카테고리 별 분류 기능

      ```js
      const menuList = document.getElementById("menu-list");
      let option;
      // 전체(0), 식사류(1), 면류(2), 음료(3), keyword(4)

      function sortMenu(option, word = "") {
        let filteredItems;

        switch (option) {
          case 0: // 전체
            filteredItems = menuItems;
            break;
          case 1: // 식사류
            filteredItems = menuItems.filter((item) => item.category === "식사류");
            break;
          case 2: // 면류
            filteredItems = menuItems.filter((item) => item.category === "면류");
            break;
          case 3: // 음료
            filteredItems = menuItems.filter((item) => item.category === "음료");
            break;
          case 4: // 키워드 검색
            filteredItems = menuItems.filter(
              (item) =>
                item.name.includes(word) ||
                item.description.includes(word) ||
                item.category.includes(word) ||
                item.price.includes(word)
            );
            break;
          default:
            filteredItems = menuItems;
            break;
        }

        // 기존 메뉴 리스트 내용 제거
        // menuList.innerHTML = "";

        menuList.innerHTML = filteredItems
          .map(
            (item) => `<div class="card" style="width: 18rem">
              <img src=${item.src} class="card-img-top" alt="${
              item.name + " 이미지"
            }" />
              <div class="card-body">
                <h5 class="card-title menu_item">${item.name}</h5>
                <p class="card-text description">
                  ${item.description}
                </p>
              </div>
              <ul class="list-group list-group-flush">
                <li class="list-group-item category">${item.category}</li>
                <li class="list-group-item price">${item.price}</li>
              </ul>
            </div>`
          )
          .join("");
      }

      sortMenu(0); //default로 전체 메뉴 보여줌

      //카테고리 별
      const categoryBtn = document.querySelector(".category_text");
      const all = document.querySelector(".all");
      const meal = document.querySelector(".meal");
      const noodle = document.querySelector(".noodle");
      const drinks = document.querySelector(".drinks");

      all.addEventListener("click", function () {
        categoryBtn.textContent = "전체";
        sortMenu(0);
      });

      meal.addEventListener("click", function () {
        categoryBtn.textContent = "식사류";
        sortMenu(1);
      });

      noodle.addEventListener("click", function () {
        categoryBtn.textContent = "면류";
        sortMenu(2);
      });

      drinks.addEventListener("click", function () {
        categoryBtn.textContent = "음료";
        sortMenu(3);
      });
      ```
        - 이런식으로 아예 `sortMenu` 함수를 만들어서 사용(가독성 높이기 위함)
        - 각 카테고리별로 option 값 지정해서 그 option 값에 해당되는 메뉴들만 filtering해서 새로운 배열을 만들어줌. 그리고 만든 배열을 기반으로 `innerHTML` 사용해서 요소 추가해줌.

      
#### 추가적인 내용
  1) 요소의 ID를 사용해서 js에서 그 요소 지정할 때, `getElementByID`와 `querySelector` 차이  
    - `querySelector("#menu-list")`: CSS 선택자를 사용하기 때문에 ID 앞에 #을 붙여야함.
        - **querySelector**는 더 복잡한 CSS 선택자를 처리할 수 있지만, 선택자가 복잡할수록 속도가 느릴 수 있음. 단일 ID 선택을 한다면 **getElementById**보다 성능이 떨어짐.

    - `getElementById("menu-list")`: getElementById는 오직 ID 값만 입력하므로 #을 붙이면 안 됨.
        - 특정 ID의 요소를 바로 찾기 때문에 빠르다. DOM에서 ID는 고유해야 하므로, 검색이 최적화되어 있음.

    - 정리하자면, `document.querySelector()`는 css 선택자를 사용해 요소를 선택함.(첫번째로 일치하는 요소 하나만 반환함.) 그래서, `document.querySelector('div > p.myClass')` 이런 식으로 복잡한 css 선택자 만들 수 있음. 하지만, `document.getElementByID`는 오직 ID만을 선택할 수 있음.

  2) `flex` 관련 내용
    - 요소 한 줄에 특정 개수만큼만 보이게 하고 싶을 때:
      1. `flex-basis` 사용: flex 아이템의 기본 크기 설정.(`flex-direction`이 row일 떄는 너비, column일 때는 높이). 각종 단위 수(px, % 등) 들어갈 수 있음. 
        - 예를 들어, 한 줄에 3개씩 배치하고 싶다면 각 요소의 너비를 33.33%로 설정하여 한 줄에 3개가 들어가도록 만들 수 있음.
      2. `flex-grow` 사용: 유연하게 늘리는 법. 아이템이 `flex-basis` 값보다 커질 수 있는지를 결정하는 속성. 숫자값이 들어감. 0보다 큰 값이 설정되면 해당 아이템이 유연한 박스로 변하고 원래 크기보다 커지며 빈 공간을 메우게 됨.(기본 값이 0이어서 따로 적용하기 전에는 아이템이 늘어나지 않음). `flex-basis`를 제외한 여백 부분을 flex-grow에 지정된 숫자의 비율로 나누어 가짐.
        - 예를 들어,  `flex: 1 1 calc(33.33%);` 이런 식으로 flex-grow 속성을 사용하여 한 줄에 3개씩 꽉 차게 만들 수 있음.

    - 줄넘김 처리: `flex-wrap`
      - `nowrap`(기본값, 넘치면 걍 삐져나옴), `wrap`(줄바꿈함),`wrap-reverse`(역순으로 줄바꿈함)
    
    - 정렬: `justify`는 메인축 방향으로 정렬(수평),`align`은 수직 축으로 정렬
      1. `justify-content`: 메인축 방향으로 아이템 정렬
        -  `flex-start`(기본값, 시작점으로 정렬),`flex-end`(끝점 정렬), `center`(가운데),`space-between`(아이템들의 사이에 균일한 간격 만들어줌),`space-around`(아이템들의 둘레에 균일한 간격),`space-evenly`(아이템들의 사이와 양 끝에 균일한 간격//IE와 EDGE 브라우저에서는 지원 안됨.)
      
      2. `align-items`: 수직축 방향으로 아이템들 정렬.
        - `stretch`(기본값, 수직축 방향),`flex-start`,`flex-end`,`center`,`baseline`

      3. `align-content`: 여러행 정렬, `wrap`이 설정된 상태에서, 아이템들의 행이 2줄 이상 되었을 땨의 수직축 방향 정렬.
      
