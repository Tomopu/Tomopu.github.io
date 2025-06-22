async function fetchBlogFileList() {
  // ブログのインデックスファイルを取得, 例: ["/blog/post1.html", "/blog/post2.html"]
  const res = await fetch('/blog/blog-index.json');
  return await res.json();
}

async function fetchBlogMetadata(url) {
  const res = await fetch(url);
  const html = await res.text();

  const doc = new DOMParser().parseFromString(html, 'text/html');
  const jsonLd = doc.querySelector('script[type="application/ld+json"]');
  // JSON-LD スクリプトが見つからない場合は null を返す
  if (!jsonLd) return null;

  try {
    const meta = JSON.parse(jsonLd.textContent);
    // "dateUpdated" または HTTPヘッダの "Last-Modified" を使用
    const dateUpdated = meta.dateUpdated || res.headers.get("Last-Modified") || meta.datePublished;

    return {
      url: url,
      title: meta.headline || "",
      published: meta.datePublished || "",
      updated: new Date(meta.dateUpdated) || new Date(meta.dateModified),
      author: meta.author?.name || "",
      description: meta.description || "",
      keywords: Array.isArray(meta.keywords) ? meta.keywords : []
    };
  } catch (e) {
    console.error(`JSON parse error in ${url}`, e);
    return null;
  }
}

async function renderBlogList() {
  const blog_list = document.getElementById('blog-list');
  const blogFiles = await fetchBlogFileList();
  const metadataList = [];

  for (const file of blogFiles) {
    const meta = await fetchBlogMetadata(file);
    if (meta) metadataList.push(meta);
  }

  // "updated" 日時で降順ソート
  metadataList.sort((a, b) => b.updated - a.updated);

  for (const meta of metadataList) {
    const li = document.createElement('li');
    li.classList.add('blog-item');

    const a = document.createElement('a');
    a.href = meta.url;

    // タイトル
    const title = document.createElement('p');
    title.classList.add('title');
    title.textContent = meta.title;
    a.appendChild(title);

    // 日付（カレンダーアイコン付き）
    const date = document.createElement('p');
    date.classList.add('date');

    const calIcon = document.createElement('img');
    calIcon.src = '/img/calendar.svg';
    calIcon.alt = 'icon';
    calIcon.classList.add('calender-icon');

    const dateText = document.createTextNode(
      `${meta.updated.getFullYear()}年${meta.updated.getMonth() + 1}月${meta.updated.getDate()}日`
    );

    date.appendChild(calIcon);
    date.appendChild(dateText);
    a.appendChild(date);

    // カテゴリ（キーワード）
    if (meta.keywords.length > 0) {
      const keywords_list = document.createElement('p');
      keywords_list.classList.add('keywords');

      for (const word of meta.keywords) {
        const span = document.createElement('span');
        span.classList.add('keyword');
        span.textContent = word;
        keywords_list.appendChild(span);
      }

      a.appendChild(keywords_list);
    }

    // 説明文
    if (meta.description) {
      const desc = document.createElement('p');
      desc.classList.add('description');
      desc.textContent = meta.description;
      a.appendChild(desc);
    }

    li.appendChild(a);
    blog_list.appendChild(li);
  }
}

renderBlogList();