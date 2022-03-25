var beforePos = 0;  // スクロールの値の比較用の変数

// スクロール途中でヘッダーが消え、上にスクロールすると復活
function ScrollAnime() {
    // wrapperの位置(上部)まで来たら
	var wrapper = document.getElementById("wrapper");
	var rect = wrapper.getBoundingClientRect();
	var scrollTop = window.pageYOffset || document.documentElement.scrollTop;
	const elemTop = rect.top + scrollTop;

	var headerSet = document.getElementById('header_set');
	var scroll = document.documentElement.scrollTop || document.body.scrollTop;	// スクロールの上部座標

	var header = document.getElementById('header');

    //ヘッダーの出し入れをするs
    if(scroll === beforePos) {
	//IE11対策で処理を入れない
    }else if(elemTop > scroll || 0 > scroll - beforePos){
		//ヘッダーが上から出現する
		headerSet.classList.remove('UpMove');	// UpMoveというクラス名を除き
		headerSet.classList.add('DownMove');  	// DownMoveのクラス名を追加
    }else {
		//ヘッダーが上に消える
        headerSet.classList.remove('DownMove');   // DownMoveというクラス名を除き
		headerSet.classList.add('UpMove');        // UpMoveのクラス名を追加
    }

	// main_visual上ではheaderを透明にする
	if(elemTop > scroll) {
		if(header.classList.contains('toOpacity')){
			//ヘッダーが上から出現する
			header.classList.remove('toOpacity');
			header.classList.add('toClear');
		}
	}else{
		if(header.classList.contains('toClear')){
			//ヘッダーが上から出現する
			header.classList.remove('toClear');
			header.classList.add('toOpacity');
		}
	}
    
    beforePos = scroll; // 現在のスクロール値を代入
}

// ヘッダーの分だけメインビジュアルを下に下げる
function ChangeMainVisualPaddingTop() {
    // headerの高さを取得
	var header = document.getElementById('header');
	var headerHeight = header.clientHeight;     // headerの高さ
	
    // #main_viualの余白をheaderの高さ分追加
	var mainVisual = document.getElementById('main_visual');
	mainVisual.style.paddingTop= headerHeight + 'px';
}

// 画面スクロールのイベントリスナー
window.addEventListener('scroll', function(){
	ScrollAnime();
});

// HTMLの読み込み完了時のイベントリスナー
window.addEventListener('DOMContentLoaded', function() {
	ChangeMainVisualPaddingTop();
});

// 画面のサイズ変更時のイベントリスナー
window.addEventListener('resize', function() {
	ChangeMainVisualPaddingTop();
});