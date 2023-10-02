const apiKey = "AIzaSyD91cxlCz08UtjjOWl-fQQJPbwmj3n69x4";
const baseUrl = "https://www.googleapis.com/youtube/v3";
let inputbtn = document.querySelector(".nav-search-bar input");
let videoContainer = document.getElementsByClassName("video-container")[0];


function getTimeOfvideo(publishTime){
    const publishDate = new Date(publishTime);
    const currentDate = new Date();
   
    const secondGap = (currentDate.getTime()-publishDate.getTime())/1000;

    const secondPerDay = 60*60*24;
    const secondPerWeek = 7*secondPerDay;
    const secondPerMonth = 30*secondPerDay;
    const secondPerYear = 365*secondPerDay;

    if(secondGap<secondPerDay){
        return `${Math.floor((secondGap/60*60))} hrs ago`;
    }
    if(secondGap<secondPerWeek){
        return `${Math.floor(secondGap/secondPerDay)} days ago`;
    }
    if(secondGap<secondPerMonth){
        return `${Math.floor(secondGap/secondPerWeek)} weeks ago`;
    }
    if(secondGap<secondPerYear){
        return `${Math.floor(secondGap/secondPerMonth)} months ago`;
    }
    
     return `${Math.floor(secondGap/secondPerYear)} years ago`;
    
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
function navigateToVideo(videoId){
    document.cookie=`id=${videoId}; path=/page-2/video.html`;
    // document.cookie=`vedioData=${element}; path=/page-2/video.html`;
    window.location.href="http://127.0.0.1:5502/page-2/video.html";
   
}
async function getVideoStatistic(videoId){
    const url = `${baseUrl}/videos?key=${apiKey}&part=statistics&id=${videoId}`;
    try{
        let responce = await fetch(url);
        let result = await responce.json();
        return result.items[0].statistics;
    }
    catch(error){
        console.log(error)
    }

}

async function getChannelDetails(channelId){
    const url = `${baseUrl}/channels?key=${apiKey}&id=${channelId}&part=snippet`;
    try{
        let responce = await fetch(url);
        let result = await responce.json();
        return result.items[0].snippet.thumbnails.high.url;
    }
    catch(error){
       console.log(error)
    }
   
}

function renderVideo(arr){
    videoContainer.innerHTML="";
    // console.log(arr[0].snippet.thumbnails)
    arr.forEach(element => {
            let videoCart= document.createElement("div");
            videoCart.className="video-cart";
            videoCart.innerHTML=
             `<div class="thumbnail">
                <img src="${element.snippet.thumbnails.high.url}" alt="thumbnail">
                <p class="duration">23:16</p>
            </div>
            <div class="video-details">
                <div class="profile-logo"><img src="${element.channelLogoUrl}" alt=""></div>
                <div class="details">
                    <h5 class="video-name">${element.snippet.title}</h5>
                    <p class="channel-name">${element.snippet.channelTitle}</p> 
                    <p class="views-time">${viewCount(element.statistics.viewCount)}  . ${getTimeOfvideo(element.snippet.publishTime)}</p>     
                </div>
            </div>`
            
          videoContainer.appendChild(videoCart)
          videoCart.addEventListener("click",()=>{navigateToVideo(element.id.videoId)});
    });
}

async function getData(searchString){
    const url= `${baseUrl}/search?key=${apiKey}&q=${searchString}&part=snippet&maxResults=20&type=video`;
    try{
        let responce = await fetch(url);
        let data = await responce.json();
        for(let i=0;i<data.items.length;++i){
                let currentVideoId = data.items[i].id.videoId;
                let channelId = data.items[i].snippet.channelId;
                try{
                    let statistics = await getVideoStatistic(currentVideoId);
                    let channelLogoUrl = await getChannelDetails(channelId);
                    data.items[i].statistics = statistics;
                    data.items[i].channelLogoUrl = channelLogoUrl;
                }
                catch(error){
                    console.log(error)
                }
        }
        renderVideo(data.items);
       
        // console.log(data.items);
    }
    catch(error){
        alert(error);
    }
}

inputbtn.addEventListener("keyup",(event)=>{
    if(event.key==="Enter"||event.keyCode===13){
        let searchString =inputbtn.value;
     getData(searchString);
     }
 })

//  search api
// data= {
//     "kind": "youtube#searchListResponse",
//     "etag": "sQk5DJH6OEYRjtNBUw7yFSgRXOc",
//     "nextPageToken": "CAEQAA",
//     "regionCode": "IN",
//     "pageInfo": {
//       "totalResults": 1000000,
//       "resultsPerPage": 1
//     },
//     "items": [
//       {
//         "kind": "youtube#searchResult",
//         "etag": "FsAk7kcmk71XMQoALyhRovlu1Lc",
//         "id": {
//           "kind": "youtube#video",
//           "videoId": "UmnCZ7-9yDY"
//         },
//         "snippet": {
//           "publishedAt": "2021-07-03T16:37:28Z",
//           "channelId": "UCBwmMxybNva6P_5VmxjzwqA",
//           "title": "Java Tutorial for Beginners | Learn Java in 2 Hours",
//           "description": "Are you worried about placements/internships? Want to prepare for companies like Microsoft, Amazon & Google? Join ALPHA.",
//           "thumbnails": {
//             "default": {
//               "url": "https://i.ytimg.com/vi/UmnCZ7-9yDY/default.jpg",
//               "width": 120,
//               "height": 90
//             },
//             "medium": {
//               "url": "https://i.ytimg.com/vi/UmnCZ7-9yDY/mqdefault.jpg",
//               "width": 320,
//               "height": 180
//             },
//             "high": {
//               "url": "https://i.ytimg.com/vi/UmnCZ7-9yDY/hqdefault.jpg",
//               "width": 480,
//               "height": 360
//             }
//           },
//           "channelTitle": "Apna College",
//           "liveBroadcastContent": "none",
//           "publishTime": "2021-07-03T16:37:28Z"
//         }
//       }
//     ]
//   }
//  
    
// Endpoint : video?
// console.log(result)--------
// {
//     "kind": "youtube#videoListResponse",
//     "etag": "k8JYOC5eq2a7bqFG3HLIct-Us9s",
//     "items": [
//         {
//             "kind": "youtube#video",
//             "etag": "FNWa_zJlTgV7v9Lj4YihMYSR_T4",
//             "id": "_nqVLjtKkdE",
//             "statistics": {
//                 "viewCount": "810303",
//                 "likeCount": "43167",
//                 "favoriteCount": "0",
//                 "commentCount": "504"
//             }
//         }
//     ],
//     "pageInfo": {
//         "totalResults": 1,
//         "resultsPerPage": 1
//     }
// }


//     endPoint : /channels?
// console.log(result)---
// {
//     "kind": "youtube#channelListResponse",
//     "etag": "V7vS502ydlEQWVSxQl2amasWQns",
//     "pageInfo": {
//         "totalResults": 1,
//         "resultsPerPage": 5
//     },
//     "items": [
//         {
//             "kind": "youtube#channel",
//             "etag": "rjtTPQc8f_jQkehh-v_W77XLQts",
//             "id": "UCsha2ITWrmaXHQfuNapG_TA",
//             "snippet": {
//                 "title": "AdiTea",
//                 "description": "Muskurate Raho ❤️🤌🏼",
//                 "customUrl": "@aditea31",
//                 "publishedAt": "2020-07-04T15:20:06.906198Z",
//                 "thumbnails": {
//                     "default": {
//                         "url": "https://yt3.ggpht.com/ytc/AOPolaRXfdrZecVhGn3s2mTl4Mn32EfPndIPTkKTncbmSw=s88-c-k-c0x00ffffff-no-rj",
//                         "width": 88,
//                         "height": 88
//                     },
//                     "medium": {
//                         "url": "https://yt3.ggpht.com/ytc/AOPolaRXfdrZecVhGn3s2mTl4Mn32EfPndIPTkKTncbmSw=s240-c-k-c0x00ffffff-no-rj",
//                         "width": 240,
//                         "height": 240
//                     },
//                     "high": {
//                         "url": "https://yt3.ggpht.com/ytc/AOPolaRXfdrZecVhGn3s2mTl4Mn32EfPndIPTkKTncbmSw=s800-c-k-c0x00ffffff-no-rj",
//                         "width": 800,
//                         "height": 800
//                     }
//                 },
//                 "localized": {
//                     "title": "AdiTea",
//                     "description": "Muskurate Raho ❤️🤌🏼"
//                 }
//             }
//         }
//     ]
// }


// 0: 
// channelLogoUrl: "https://yt3.ggpht.com/ytc/APkrFKb--NH6RwAGHYsD3KfxX-SAgWgIHrjR5E4Jb5SDSQ=s800-c-k-c0x00ffffff-no-rj"
// etag: "6xKwmejEePIyw05TWYAJkjZpe7M"
// id: 
// kind : "youtube#video"
// videoId: "l9AzO1FMgM8"
// [[Prototype]]
// : 
// Object
// kind
// : 
// "youtube#searchResult"
// snippet
// : 
// {publishedAt: '2021-11-03T16:23:58Z', channelId: 'UCsBjURrPoezykLs9EqgamOA', title: 'Java in 100 Seconds', description: 'Java is a programming language famous for its abil…ndent bytecode. It powers enterprise web apps ...', thumbnails: {…}, …}
// statistics
// : 
// commentCount
// : 
// "1607"
// favoriteCount
// : 
// "0"
// likeCount
// : 
// "63161"
// viewCount
// : 
// "1031684"
// [[Prototype]]
// : 
// Object
// [[Prototype]]
// : 
// Object