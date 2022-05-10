'use strict';
// Znajdowanie wszystkich linków
/*document.getElementById('test-button').addEventListener('click', function(){
    const links = document.querySelectorAll('.titles a');
    console.log('links:', links);
  });
  */

const titleClickHandler = function (event) {
    event.preventDefault();
    const clickedElement = this;
    console.log('Link was clicked!');
    console.log("event = ", event);


    /* [DONE] remove class 'active' from all article links  */

    const activeLinks = document.querySelectorAll('.titles a.active');

    for (let activeLink of activeLinks) {
        activeLink.classList.remove('active');
    }

    /* [IN PROGRESS] add class 'active' to the clicked link */


    clickedElement.classList.add('active');
    console.log('clickedElement:', clickedElement);

    /* [DONE] remove class 'active' from all articles */

    const activeArticles = document.querySelectorAll('.posts .active');

    for (let activeArticle of activeArticles) {
        activeArticle.classList.remove('active');
    }

    /* get 'href' attribute from the clicked link */

    const articleSelector =  clickedElement.getAttribute("href");
    console.log("Link was clicked!");


    /* find the correct article using the selector (value of 'href' attribute) */

    const targetArticle = document.querySelector(articleSelector);
    console.log("Article was opened!");


    /* add class 'active' to the correct article */

    targetArticle.classList.add('active');
    console.log('targetArticle:', targetArticle);

}


const links = document.querySelectorAll('.titles a');

for (let link of links) {
    link.addEventListener('click', titleClickHandler);
}

//6.4
/*
const optArticleSelector = '.post',
  optTitleSelector = '.post-title',
  optTitleListSelector = '.titles';

function generateTitleLinks(){

  // remove contents of titleList 
}
  function clearMessages(){
	document.optTitleListSelector.innerHTML = '';
}

  // for each article 
  const articles = clickedElement.querySelectorAll('.posts');

  // find all the articles and save them to variable: articles 
  // ... 

  let html = '';

for(let article of articles){
    article.classList;
}

    // get the article id 

const articleId = document.getAttribute("id");
console.log("ID was readed!");

    // find the title element

const articleTitle = article.querySelector(optTitleSelector).innerHTML;

    // get the title from the title element 

    // create HTML of the link 

    const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';
    console.log("code of HTML link")
    // insert link into titleList 

    titleList.innerHTML = titleList.innerHTML + linkHTML;

 // insert link into html variable 
 html = html + linkHTML;


titleList.innerHTML = html;
}

generateTitleLinks();

*/
