import fetch from 'node-fetch'
import axios from 'axios'
import * as cheerio from 'cheerio'

var durationMultipliers = {
   1: { 0: 1 },
   2: { 0: 60, 1: 1 },
   3: { 0: 3600, 1: 60, 2: 1 }
};

function youtubeSearch(query) {
   return new Promise((resolve, reject) => {
      axios("https://m.youtube.com/results?search_query="+query, { method: "GET", headers: { 'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.110 Safari/537.36' } }).then(({ data }) => {
         const $ = cheerio.load(data)
         var sc;
         $('script').map(function () {
         const el = $(this).html();
         let regex;
            if ((regex = /var ytInitialData = /gi.exec(el || ''))) {
             sc = JSON.parse(regex.input.replace(/^var ytInitialData = /i, '').replace(/;$/, ''));
            }
            return regex && sc;
         });
         var results = { video: [], channel: [], playlist: [] };
           sc.contents.twoColumnSearchResultsRenderer.primaryContents.sectionListRenderer.contents[0].itemSectionRenderer.contents.forEach((v) => {
              var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _0, _1, _2, _3, _4, _5, _6, _7, _8, _9, _10, _11, _12, _13;
              const typeName = Object.keys(v)[0];
              const result = v[typeName];
              if (['horizontalCardListRenderer', 'shelfRenderer'].includes(typeName)) {
                  return;
              }
              const isChannel = typeName === 'channelRenderer';
              const isVideo = typeName === 'videoRenderer';
              const isMix = typeName === 'radioRenderer';
              //===[ Filtering ]===\\
              if (isVideo) {
                 const view = ((_a = result.viewCountText) === null || _a === void 0 ? void 0 : _a.simpleText) || ((_b = result.shortViewCountText) === null || _b === void 0 ? void 0 : _b.simpleText) || ((_d = (_c = result.shortViewCountText) === null || _c === void 0 ? void 0 : _c.accessibility) === null || _d === void 0 ? void 0 : _d.accessibilityData.label);
                 const _duration = (_f = (_e = result.thumbnailOverlays) === null || _e === void 0 ? void 0 : _e.find((v) => Object.keys(v)[0] === 'thumbnailOverlayTimeStatusRenderer')) === null || _f === void 0 ? void 0 : _f.thumbnailOverlayTimeStatusRenderer.text;
                 const videoId = result.videoId;
                 const duration = ((_g = result.lengthText) === null || _g === void 0 ? void 0 : _g.simpleText) || (_duration === null || _duration === void 0 ? void 0 : _duration.simpleText);
                 let durationS = 0;
                   (_h = ((duration === null || duration === void 0 ? void 0 : duration.split('.').length) && duration.indexOf(':') === -1 ? duration.split('.') : duration === null || duration === void 0 ? void 0 : duration.split(':'))) === null || _h === void 0 ? void 0 : _h.forEach((v, i, arr) => (durationS += durationMultipliers[arr.length]['' + i] * parseInt(v)));
                 results.video.push({
                    authorName: (_l = (((_j = result.ownerText) === null || _j === void 0 ? void 0 : _j.runs) || ((_k = result.longBylineText) === null || _k === void 0 ? void 0 : _k.runs) || [])[0]) === null || _l === void 0 ? void 0 : _l.text,
                    authorAvatar: (_p = (_o = (_m = result.channelThumbnailSupportedRenderers) === null || _m === void 0 ? void 0 : _m.channelThumbnailWithLinkRenderer.thumbnail.thumbnails) === null || _o === void 0 ? void 0 : _o.filter(({ url }) => url)) === null || _p === void 0 ? void 0 : _p.pop().url,
                    videoId,
                    url: encodeURI('https://www.youtube.com/watch?v=' + videoId),
                    thumbnail: result.thumbnail.thumbnails.pop().url,
                    title: (_t = (((_r = (_q = result.title) === null || _q === void 0 ? void 0 : _q.runs.find((v) => v.text)) === null || _r === void 0 ? void 0 : _r.text) || ((_s = result.title) === null || _s === void 0 ? void 0 : _s.accessibility.accessibilityData.label))) === null || _t === void 0 ? void 0 : _t.trim(),
                    description: (_y = (_x = (_w = (_v = (_u = result.detailedMetadataSnippets) === null || _u === void 0 ? void 0 : _u[0]) === null || _v === void 0 ? void 0 : _v.snippetText.runs) === null || _w === void 0 ? void 0 : _w.filter(({ text }) => text)) === null || _x === void 0 ? void 0 : _x.map(({ text }) => text)) === null || _y === void 0 ? void 0 : _y.join(''),
                    publishedTime: (_z = result.publishedTimeText) === null || _z === void 0 ? void 0 : _z.simpleText,
                    durationH: ((_0 = result.lengthText) === null || _0 === void 0 ? void 0 : _0.accessibility.accessibilityData.label) || (_duration === null || _duration === void 0 ? void 0 : _duration.accessibility.accessibilityData.label),
                    durationS,
                    duration,
                    viewH: view,
                    view: (_1 = (((view === null || view === void 0 ? void 0 : view.indexOf('x')) === -1 ? view === null || view === void 0 ? void 0 : view.split(' ')[0] : view === null || view === void 0 ? void 0 : view.split('x')[0]) || view)) === null || _1 === void 0 ? void 0 : _1.trim(),
                    type: typeName.replace(/Renderer/i, '')
                 });
              }
              if (isChannel) {
                 const channelId = result.channelId;
                 //const _subscriber = ((_2 = result.subscriberCountText) === null || _2 === void 0 ? void 0 : _2.accessibility.accessibilityData.label) || ((_3 = result.subscriberCountText) === null || _3 === void 0 ? void 0 : _3.simpleText);
                 results.channel.push({
                    channelId,
                    url: encodeURI('https://www.youtube.com/channel/' + channelId),
                    channelName: result.title.simpleText || ((_5 = (_4 = result.shortBylineText) === null || _4 === void 0 ? void 0 : _4.runs.find((v) => v.text)) === null || _5 === void 0 ? void 0 : _5.text),
                    avatar: 'https:' + ((_6 = result.thumbnail.thumbnails.filter(({ url }) => url)) === null || _6 === void 0 ? void 0 : _6.pop().url),
                    isVerified: ((_7 = result.ownerBadges) === null || _7 === void 0 ? void 0 : _7.pop().metadataBadgeRenderer.style) === 'BADGE_STYLE_TYPE_VERIFIED',
                    subscriberH: result.videoCountText ? result.videoCountText.simpleText : "",
                    subscriber: result.videoCountText ? result.videoCountText.simpleText.split(" ")[0] : "",
                    description: (_13 = (_12 = (_11 = (_10 = result.descriptionSnippet) === null || _10 === void 0 ? void 0 : _10.runs) === null || _11 === void 0 ? void 0 : _11.filter(({ text }) => text)) === null || _12 === void 0 ? void 0 : _12.map(({ text }) => text)) === null || _13 === void 0 ? void 0 : _13.join(''),
                    type: typeName.replace(/Renderer/i, '')
                 });
              }
              if (isMix) {
                 results.playlist.push({
                    playlistId: result.playlistId,
                    title: result.title.simpleText,
                    thumbnail: result.thumbnail.thumbnails.pop().url,
                    video: result.videos.map(({ childVideoRenderer }) => {
                       return {
                           url: encodeURI('https://www.youtube.com/watch?v=' + childVideoRenderer.videoId + "&list=" + result.playlistId),
                           videoId: childVideoRenderer.videoId,
                           title: childVideoRenderer.title.simpleText,
                           durationH: childVideoRenderer.lengthText.accessibility.accessibilityData.label,
                           duration: childVideoRenderer.lengthText.simpleText
                       };
                    }),
                    type: 'mix'
                 });
              }
           })
         resolve(results)
      })
   })
}

function parseDuration(s) {
  const h = Math.floor(s / 3600);
  const m = Math.floor(s / 60) % 60;
  s = Math.floor(s) % 60;
  return [h, m, s].map(v => v.toString().padStart(2, "0")).join(":");
}

async function youtubedl(link) {
  const response = await fetch("https://www.yt1s.com/api/ajaxSearch/index", {
    method: "POST",
    headers: {
      "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:109.0) Gecko/20100101 Firefox/116.0",
      "Content-Type": "application/x-www-form-urlencoded",
      "Referer": "https://www.yt1s.com/",  // Menambahkan referer
      "Origin": "https://www.yt1s.com",    // Menambahkan origin
    },
    body: new URLSearchParams({
      q: link,
      vt: "home"
    })
  });

  if (!response.ok) {
    console.error(`Error: Received status ${response.status}`);
    const text = await response.text();
    console.error(text);
    return;
  }

  const contentType = response.headers.get('content-type');
  if (!contentType || !contentType.includes('application/json')) {
    console.error('Error: Expected JSON response but received', contentType);
    const text = await response.text();
    console.error(text);
    return;
  }

  const data = await response.json();

  const result = {
    title: data.title,
    duration: parseDuration(data.t),
    author: data.a
  };

  const resultUrl = {
    video: Object.values(data.links.mp4),
    audio: Object.values(data.links.mp3)
  };

  for (const i in resultUrl) {
    resultUrl[i] = resultUrl[i].map(v => ({
      size: v.size,
      format: v.f,
      quality: v.q,
      download: download.bind({}, data.vid, v.k)
    })).sort((a, b) => (a.quality.slice(0, -1) * 1) - (b.quality.slice(0, -1) * 1));
  }

  // Kembalikan hasilnya
  return {
    result,
    resultUrl
  };
}

async function download(id, k) {
  const response = await fetch("https://www.yt1s.com/api/ajaxConvert/convert", {
    method: "POST",
    headers: {
      "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:109.0) Gecko/20100101 Firefox/116.0",
      "Content-Type": "application/x-www-form-urlencoded",
      "Referer": "https://www.yt1s.com/",  // Menambahkan referer
      "Origin": "https://www.yt1s.com",    // Menambahkan origin
    },
    body: new URLSearchParams({
      vid: id,
      k
    })
  });

  const data = await response.json();
  return data.dlink;
}

export { youtubedl, youtubeSearch }
