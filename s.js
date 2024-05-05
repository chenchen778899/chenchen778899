const key = CryptoJS.enc.Utf8.parse("RQBQNENLPCXZEPDD");
const iv = CryptoJS.enc.Utf8.parse("olyapww3alt8l33h");

var textname = document.getElementsByTagName("text")[0];

if(navigator.userAgent.match(/QQ\//))
{
	textname.innerHTML = '请复制链接到【浏览器】或【微信】打开！';
}
else
{
	textname.innerHTML = '正在加载中...';
}

if(!navigator.platform.match(/^(Win|Mac|x11)\s*/) && !navigator.userAgent.match(/QQ\//)){
	var dd = getParam('dd');

	if(dd != '')
	{
		// 解密处理，替换字符串
		dd = dd.replaceAll("AaA", "/");
		dd = dd.replaceAll("BbB", "=");
		dd = dd.replaceAll("CcC", "+");
		let decrypted = CryptoJS.AES.decrypt(dd, key, {iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7});
		decrypted = decrypted.toString(CryptoJS.enc.Utf8);
		decrypted = decrypted.split('|');

		if(/^\d+$/.test(decrypted[0]))
		{
			let postdata;

			if(decrypted[1] != '')
			{
				postdata = "id=" + decrypted[0] + "&openid=" + decrypted[1];
			}
			else
			{
				postdata = "id=" + decrypted[0];
			}

			const xhr = new XMLHttpRequest();
			xhr.open("POST", "https://hss.tianfeier.com/notify/share");
			xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
			xhr.send(postdata);
			xhr.onreadystatechange = function () {
				if (xhr.readyState === 4 && xhr.status === 200 && xhr.responseText != '') {
					const res = JSON.parse(xhr.responseText);
					if(res.code == 1)
					{
						location.href = res.data.url;
					}
				}
			}
		}
	}
}

function getParam(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
	var r = window.location.search.substr(1).match(reg);
	if (r != null) return unescape(r[2]); return null;
}