const menuItems = [
  {
    name: "비빔밥",
    description: "밥 위에 나물, 고기, 고추장 등을 얹고 비벼 먹는 한국 요리",
    price: "₩12,000",
    category: "식사류",
    src: "https://img.etoday.co.kr/pto_db/2019/07/20190726153503_1350707_1200_876.jpg",
  },
  {
    name: "김치찌개",
    description: "김치와 돼지고기 등을 넣고 끓인 한국의 찌개 요리",
    price: "₩12,000",
    category: "식사류",
    src: "https://static.wtable.co.kr/image-resize/production/service/recipe/655/16x9/74eb99a1-cb37-4ef0-a3a9-f7ab12e3b8fe.jpg",
  },
  {
    name: "불고기",
    description: "양념한 고기를 구워서 먹는 한국 요리",
    price: "₩15,000",
    category: "식사류",
    src: "https://gomean.co.kr/wp-content/uploads/2023/06/gm-bulgogiTINY.jpg",
  },
  {
    name: "떡볶이",
    description: "떡과 어묵을 고추장 양념에 볶아 만든 한국의 간식",
    price: "₩8,000",
    category: "식사류",
    src: "https://i.namu.wiki/i/A5AIHovo1xwuEjs7V8-aKpZCSWY2gN3mZEPR9fymaez_J7ufmI9B7YyDBu6kZy9TC9VWJatXVJZbDjcYLO2S8Q.webp",
  },
  {
    name: "잡채",
    description: "당면과 여러 채소, 고기를 볶아 만든 한국 요리",
    price: "₩12,000",
    category: "면류",
    src: "https://recipe1.ezmember.co.kr/cache/recipe/2023/09/16/7dbb36575d7f1d26346f794f3af0d2de1.jpg",
  },
  {
    name: "잔치국수",
    description: "깊이 우려낸 멸치 육수를 베이스로한 한국의 국수 요리 ",
    price: "₩11,000",
    category: "면류",
    src: "https://static.wtable.co.kr/image-resize/production/service/recipe/438/16x9/ed2bf141-5342-4804-ac34-6a30fb525b01.jpg",
  },
  {
    name: "비빔국수",
    description:
      "풍미 가득한 고추장 양념이 더해진 새콤하고 매콤한 한국의 국수 요리",
    price: "₩12,000",
    category: "면류",
    src: "https://recipe1.ezmember.co.kr/cache/recipe/2018/01/19/9deb7510516f154f465f04aa46379d6e1.jpg",
  },
  {
    name: "콩국수",
    description: "콩을 직접 갈아 만든 고소한 국물 베이스의 국수 요리",
    price: "₩13,000",
    category: "면류",
    src: "https://i.namu.wiki/i/4ChBILJgL-UnL7OZnW3kbx84D0R9wfKnlLj159tKil6RrGtqYcF3M_-LLXqDnaNZVHGkGbXNn53t2SZVvpNULg.webp",
  },
  {
    name: "탄산음료",
    description: "콜라, 환타, 사이다 중 택 1",
    price: "₩2,000",
    category: "음료",
    src: "https://d15q6xcjx71x0s.cloudfront.net/_30124f1c05.jpg",
  },
  {
    name: "오렌지 주스",
    description: "직접 오렌지를 갈아 만든 홈메이드 주스",
    price: "₩5,000",
    category: "음료",
    src: "https://cafe24.poxo.com/ec01/bringcoffee/Xeym8gXyw/uNs04t9Tz1Dh1akVDrAs/NfZ9w9APGK/1238tOpjRkjIaCzg3Ip5GOD8RolSB5ES06i4T0Q9GQCQ==/_/web/product/medium/202211/82019e1922390df7000151fa6aff5f3b.jpg",
  },
  {
    name: "식혜",
    description: "찹쌀이 들어간 달콤한 한국의 전통적인 음료",
    price: "₩3,000",
    category: "음료",
    src: "https://cdn.sisajournal.com/news/photo/first/200609/img_118910_1.jpg",
  },
];

// map은 배열을 순회하면서 각 요소를 변환하고 새로운 배열을 반환.
// forEach는 배열을 순회하면서 특정 작업을 수행하되, 새로운 배열을 반환하지 않음.

// const menuList = document.querySelector("#menu-list");
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

//키워드 별
const keyword = document.getElementById("keyword");
const searchBtn = document.querySelector(".search-btn");

searchBtn.addEventListener("click", function () {
  sortMenu(4, keyword.value);
});
