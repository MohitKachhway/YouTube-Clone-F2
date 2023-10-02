const apiKey = "AIzaSyD91cxlCz08UtjjOWl-fQQJPbwmj3n69x4";
const baseUrl = "https://www.googleapis.com/youtube/v3";
let id= document.cookie.split("=")[1];

window.addEventListener("load",()=>{
    new YT.Player("video-container",{
        width :"100%",
        height: "300",
        videoId: `${id}`,
        events:{
               onReady: (event)=>{
                event.target.playVideo();
            },
           },
    });
    
    
})
vedioDetails(id);

async function vedioDetails(id){
    let url = `${baseUrl}/videos?key=${apiKey}&id=${id}&part=snippet,statistics`;
    let responce = await fetch(url);
    let result = await responce.json();
    renderVideoDetails(result.items[0]);
    loadComment(id);
}

async function channelDetails(id){
    let url = `${baseUrl}/channels?key=${apiKey}&id=${id}&part=snippet,statistics`;
    let responce = await fetch(url);
    let result = await responce.json();
    let subscribe = document.getElementsByClassName("subscriber-count")[0];
    let profileLogo = document.getElementById("profileLogo");

    subscribe.innerHTML= `${likeCount(result.items[0].statistics.subscriberCount)} subscribers`;
    profileLogo.src= `${result.items[0].snippet.thumbnails.default.url}`
}



function renderVideoDetails(element){
    let title = document.getElementsByClassName("video-name")[0];
    let videoDescription = document.getElementById("description");
    let commentCount = document.getElementById("cmtCount");
    let viewsCount = document.getElementsByClassName("views-date")[0];
    let like = document.getElementById("likeValue");
    let channelTitle = document.getElementsByClassName("channel-name")[0];

    title.innerHTML=`${element.snippet.title}`;
    videoDescription.innerHTML=`${element.snippet.description}`;
    commentCount.innerHTML=`${viewCount(element.statistics.commentCount)} Comments`;
    viewsCount.innerHTML=`${viewCount(element.statistics.viewCount)} views . ${renderPublishDate(element.snippet.publishedAt)}`;
    like.innerHTML = `${likeCount(element.statistics.likeCount)}`;
    channelTitle.innerHTML = `${element.snippet.channelTitle}`;
    channelDetails(element.snippet.channelId);
}

function renderPublishDate(sr){ //2023-09-19T10:20:00Z
    let date = sr.split("T")[0]; // 2023-09-19
    let year = date.split("-")[0];
    let month = date.split("-")[1];
    let day =  date.split("-")[2];
    
    let newDate = new Date(+year,+month,+day);
     return (String(newDate).slice(4,15));
}

function likeCount(like){
    if(like<1000) return `like`;
    if(like<1000000){
        return `${Math.floor(like/1000)}k`;
    }
    if(like<1000000000) return `${Math.floor(like/1000000)}M`;
    
    return `${Math.floor(like/1000000000)}B`;
}

function viewCount(views){
    if(views<1000){
        return `${views} Views`;
    }
    if(views<1000000){
        return `${Math.floor(views/1000)}K Views`;
    }
    return `${Math.floor(views/1000000)}M Views`
}

/* <div class="comments">
                    <div class="comment-logo"><img src="../images/Profile-pic.png" alt=""></div>
                    <div class="comment">
                        <div class="user">
                            <div class="user-name">James Gouse</div>
                            <div class="comment-time"> 8 hours ago</div>
                        </div>
                        <div class="content"><p>Wow, world Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla aliquam commodi iste quos quaerat, laboriosam dignissimos dicta, rerum odit hic maxime unde iure odio perspiciatis repellat adipisci voluptate, impedit repudiandae?is full of different skills</p></div>
                        <div class="comment-tools">
                            <div class="like">
                                <img src="../images/like-Btn.png" alt="">
                                <p class="like-count">3</p>
                            </div>
                            <div class="dislike">
                                <img src="../images/dislike-Btn (1).png" alt="">
                                <p class="dislike-count">1</p>
                            </div>
                            <div class="comment-reply"><p>REPLY</p></div>
                        </div>
                    </div>
                </div> */
let commentContainer = document.getElementsByClassName("comments")[0];

async function loadComment(id){
    let url = `${baseUrl}/commentThreads?key=${apiKey}&videoId=${id}&part=snippet`;
    try{
        let responce = await fetch(url);
        let data = await responce.json();
        let arr = data.items;
        for (let i = 0; i < arr.length; i++) {
            let {snippet} = arr[i].snippet.topLevelComment;
            let comment = document.createElement("div");
            comment.innerHTML = `<div class="comment-logo"><img src="${snippet.authorProfileImageUrl}" alt=""></div>
            <div class="comment">
                <div class="user">
                    <div class="user-name"><a href="${snippet.authorChannelUrl}" target="black">@${snippet.authorDisplayName}</a></div>
                    <div class="comment-time"> 8 hours ago</div>
                </div>
                <div class="content"><p>${snippet.textDisplay}</p></div>
                <div class="comment-tools">
                    <div class="like">
                        <img src="../images/like-Btn.png" alt="">
                        <p class="like-count">${snippet.likeCount}</p>
                    </div>
                    <div class="dislike">
                        <img src="../images/dislike-Btn (1).png" alt="">
                        <p class="dislike-count"></p>
                    </div>
                    <div class="comment-reply"><p>REPLY</p></div>
                </div>
            </div>`
            commentContainer.appendChild(comment);
            
        }
        // let {textDisplay,authorDisplayName,authorProfileImageUrl,authorChannelUrl,publishedAt,likeCount} = data.items[0].snippet.topLevelComment.snippet;
        // console.log(snippet)
        // console.log(textDisplay)
        // let {snippet} = data.items[0].snippet.topLevelComment;
        // console.log(snippet)
    }
    catch{
        alert(error);
    }
}
































// {
//     "kind": "youtube#videoListResponse",
//     "etag": "N4HPAovBhG12JYsBHE3f-yvO-5M",
//     "items": [
//       {
//         "kind": "youtube#video",
//         "etag": "b_q6L9qxmBW0uVNjJQNLgOt_dzU",
//         "id": "U_vW3OIJm9g",
//         "snippet": {
//           "publishedAt": "2023-09-19T10:20:00Z",
//           "channelId": "UChvLzY9MIzTfx0831VkY5bQ",
//           "title": "FREE Google Web Stories Course 2023 | Google Web Stories Tutorial 2023",
//           "description": "Start Your Google Web Stories Blog with Hostinger and Get 75% Off: https://www.hostg.xyz/SHDgJ\nUse Coupon code \"SATISHK\" for a 10% instant discount extra.\n(Send us your invoice and get $1000 worth of premium plugins and themes for free)\nEmail ID: gift@satishkushwaha.com\n\nNamaste Dosto,\nIn this video, I'm re-sharing my old video step by step guide to start Google Web Stories blog.  Also sharing my experience with 2 web stories case study. Here are the following questions included,\n1. What are web stories?\n2. Why to do Web Stories?\n3. Web Stories Earning Proof.\n4. How to Setup Web Stories?\n5. How to Create Web Stories?\n6. How to find topics for web stories?\n7. How to monetize web stories?\n\nEssential Plugins:\n1. Google Sitekit\n2. Rankmath SEO\n3. Wp-Rocket\n4. Updraft plus\n5. AMP\n6. Web Stories by Google\n7. Shortpixel\n8. Ad Inserter (After Adsense Approval)\n\nJoin on Instagram Broadcast & Telegram Channel to get exclusive Updates: \n➤https://ig.me/j/AbZlhC6jQf7dT0Ih/\n➤ https://t.me/satishkvideos\n\nFollow on Instagram: https://www.instagram.com/satishkvideos/\n\n➡7 Days Free Keyword Research Tool Semrush: https://semrush.sjv.io/SKV\nFree Courses:\n1. Free Blogging Course: https://www.youtube.com/watch?v=aa4zlf_J-BY\n2. Free Web Stories Course: https://www.youtube.com/watch?v=3zyIIDS520M\n3. Free Domain Investing Course: https://www.youtube.com/watch?v=7KpQPLqkdjs&list=PLknoIzFBHjQnizxPNF3wuWu2dUDelsbTt\n4. Free Affiliate Marketing Course: https://www.youtube.com/watch?v=ZJbCr6Ax08Q&list=PLknoIzFBHjQlBwIxos6TZu7872ALzdcas\n\n#machateraho #satishkvideos #satishkshort",
//           "thumbnails": {
//             "default": {
//               "url": "https://i.ytimg.com/vi/U_vW3OIJm9g/default.jpg",
//               "width": 120,
//               "height": 90
//             },
//             "medium": {
//               "url": "https://i.ytimg.com/vi/U_vW3OIJm9g/mqdefault.jpg",
//               "width": 320,
//               "height": 180
//             },
//             "high": {
//               "url": "https://i.ytimg.com/vi/U_vW3OIJm9g/hqdefault.jpg",
//               "width": 480,
//               "height": 360
//             },
//             "standard": {
//               "url": "https://i.ytimg.com/vi/U_vW3OIJm9g/sddefault.jpg",
//               "width": 640,
//               "height": 480
//             },
//             "maxres": {
//               "url": "https://i.ytimg.com/vi/U_vW3OIJm9g/maxresdefault.jpg",
//               "width": 1280,
//               "height": 720
//             }
//           },
//           "channelTitle": "Satish K Videos EXTRA",
//           "tags": [
//             "google web stories",
//             "google web stories tutorial",
//             "web stories",
//             "google web stories 2023",
//             "web stories kaise banaye",
//             "web stories kya hai",
//             "web stories full course",
//             "web stories earning proof",
//             "web stories income",
//             "web stories se earning kaise kare",
//             "google web stories kaise banaye",
//             "google web stories kya hai",
//             "start web story blog",
//             "create google web stories blog",
//             "create wordpress blog",
//             "satish k videos"
//           ],
//           "categoryId": "22",
//           "liveBroadcastContent": "none",
//           "localized": {
//             "title": "FREE Google Web Stories Course 2023 | Google Web Stories Tutorial 2023",
//             "description": "Start Your Google Web Stories Blog with Hostinger and Get 75% Off: https://www.hostg.xyz/SHDgJ\nUse Coupon code \"SATISHK\" for a 10% instant discount extra.\n(Send us your invoice and get $1000 worth of premium plugins and themes for free)\nEmail ID: gift@satishkushwaha.com\n\nNamaste Dosto,\nIn this video, I'm re-sharing my old video step by step guide to start Google Web Stories blog.  Also sharing my experience with 2 web stories case study. Here are the following questions included,\n1. What are web stories?\n2. Why to do Web Stories?\n3. Web Stories Earning Proof.\n4. How to Setup Web Stories?\n5. How to Create Web Stories?\n6. How to find topics for web stories?\n7. How to monetize web stories?\n\nEssential Plugins:\n1. Google Sitekit\n2. Rankmath SEO\n3. Wp-Rocket\n4. Updraft plus\n5. AMP\n6. Web Stories by Google\n7. Shortpixel\n8. Ad Inserter (After Adsense Approval)\n\nJoin on Instagram Broadcast & Telegram Channel to get exclusive Updates: \n➤https://ig.me/j/AbZlhC6jQf7dT0Ih/\n➤ https://t.me/satishkvideos\n\nFollow on Instagram: https://www.instagram.com/satishkvideos/\n\n➡7 Days Free Keyword Research Tool Semrush: https://semrush.sjv.io/SKV\nFree Courses:\n1. Free Blogging Course: https://www.youtube.com/watch?v=aa4zlf_J-BY\n2. Free Web Stories Course: https://www.youtube.com/watch?v=3zyIIDS520M\n3. Free Domain Investing Course: https://www.youtube.com/watch?v=7KpQPLqkdjs&list=PLknoIzFBHjQnizxPNF3wuWu2dUDelsbTt\n4. Free Affiliate Marketing Course: https://www.youtube.com/watch?v=ZJbCr6Ax08Q&list=PLknoIzFBHjQlBwIxos6TZu7872ALzdcas\n\n#machateraho #satishkvideos #satishkshort"
//           }
//         },
//         "statistics": {
//           "viewCount": "62348",
//           "likeCount": "3169",
//           "favoriteCount": "0",
//           "commentCount": "281"
//         }
//       }
//     ],
//     "pageInfo": {
//       "totalResults": 1,
//       "resultsPerPage": 1
//     }
//   }
  