{
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
        console.log('event = ', event);


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

        const articleSelector = clickedElement.getAttribute('href');
        console.log('Link was clicked!');


        /* find the correct article using the selector (value of 'href' attribute) */

        const targetArticle = document.querySelector(articleSelector);
        console.log('Article was opened!');


        /* add class 'active' to the correct article */

        targetArticle.classList.add('active');
        console.log('targetArticle:', targetArticle);

    };

    const optArticleSelector = '.post',
        optTitleSelector = '.post-title',
        optTitleListSelector = '.titles',
        optArticleTagsSelector = '.post-tags .list';

    function generateTitleLinks() {
        console.log('funkction generateTitleLinks');

        // remove contents of titleList 
        const titleList = document.querySelector(optTitleListSelector);
        titleList.innerHTML = '';

        // for each article 
        const articles = document.querySelectorAll(optArticleSelector);
        let html = '';
        for (let article of articles) {

            // get the article id 
            const articleId = article.getAttribute('id');

            // find the title element
            const articleTitle = article.querySelector(optTitleSelector).innerHTML;

            // create HTML of the link 

            const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';
            console.log('code of HTML link');
            // insert link into titleList 
            const titleList = document.querySelector(optTitleListSelector);
            titleList.innerHTML = '#';
            // insert link into html variable 
            html = html + linkHTML;
        }


        titleList.innerHTML = html;
    }

    generateTitleLinks();


    const links = document.querySelectorAll('.titles a');
    console.log('links:', links);

    for (let link of links) {
        link.addEventListener('click', titleClickHandler);
    }

    function generateTags(){
        console.log('funkction generateTags');

        /* find all articles */
        const articles = document.querySelectorAll(optArticleSelector);

        /* START LOOP: for every article: */
        for (let article of articles) {

        /* find tags wrapper */
        const titleList = article.querySelector(optArticleTagsSelector);
        
        /* make html variable with empty string */
        let html = '';

        /* get tags from data-tags attribute */
        const articleTags = clickedElement.getAttribute('href');
        console.log('Link was clicked!');

        /* split tags into array */
        const articleTagsArray = articleTags.split(' ');
        console.log('split tags into array');

        /* START LOOP: for each tag */
        for(let tag of articleTagsArray){
        console.log('start of the loop of each tag')

        /* generate HTML of the link */
        const linkHTML = '<li><a href="#tag-' + articleId + '"><span>' + articleTitle + '</span></a></li>';
        console.log('generate HTML of the  link');

        /* add generated code to html variable */
        html = html + linkHTML;

        /* END LOOP: for each tag */
        }

        /* insert HTML of all the links into the tags wrapper */
        //???

        /* END LOOP: for every article: */
        }

    }

    generateTags();

    function tagClickHandler(event){
        /* prevent default action for this event */
      
        /* make new constant named "clickedElement" and give it the value of "this" */
      
        /* make a new constant "href" and read the attribute "href" of the clicked element */
      
        /* make a new constant "tag" and extract tag from the "href" constant */
      
        /* find all tag links with class active */
      
        /* START LOOP: for each active tag link */
      
          /* remove class active */
      
        /* END LOOP: for each active tag link */
      
        /* find all tag links with "href" attribute equal to the "href" constant */
      
        /* START LOOP: for each found tag link */
      
          /* add class active */
      
        /* END LOOP: for each found tag link */
      
        /* execute function "generateTitleLinks" with article selector as argument */
    }
      
    function addClickListenersToTags(){
        /* find all links to tags */
      
        /* START LOOP: for each link */
      
          /* add tagClickHandler as event listener for that link */
      
        /* END LOOP: for each link */
    }
      
    addClickListenersToTags();

}