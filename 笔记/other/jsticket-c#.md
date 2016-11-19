```java

using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using MKHXHHEHEHE.WEB.Util;
using WeixinApi;
using System.Threading.Tasks;
using Newtonsoft.Json.Linq;

namespace MKHXHHEHEHE.WEB.Controllers
{
    public class WeixinJsApiController : Controller
    {
        // GET: WeixinJsApi
        public async Task<String> GetTestConfig(string url,string jsonpCallback)
        {
         
            JObject config=await WeixinUtil.GetTestWeixinInfo().GetJsApiConfig(url);
            string ticket = config.ToString();
            return jsonpCallback+"("+ ticket+")";
        }


        public async Task<String> GetTest2Config(string url, string jsonpCallback)
        {

            JObject config = await WeixinUtil.GetTest2WeixinInfo().GetJsApiConfig(url);
            string ticket = config.ToString();
            return jsonpCallback + "(" + ticket + ")";
        }


        public async Task<String> GetWyConfig(string url, string jsonpCallback)
        {

            JObject config = await WeixinUtil.GetWyWeixinInfo().GetJsApiConfig(url);
            string ticket = config.ToString();
            return jsonpCallback + "(" + ticket + ")";
        }
    }
}





using System; 
using System.Collections.Generic; 
using System.Linq; 
using System.Web; 
using System.Text; 
using System.Net.Http; 
using System.Threading.Tasks; 
using Newtonsoft.Json.Linq; 
using System.Security.Cryptography; 


namespace WeixinApi 
{ 
public class WeixinInfo 
{ 
public string appId { get; set; } 
private string appSecret { get; set; } 
private string accessToken { get; set; } 
private string jsapiTicket { get; set; } 
private DateTime updateTokenTime { get; set; } 
private DateTime updateJsApiTime { get; set; } 

public WeixinInfo(string appId, string appSecret) 
{ 
this.appId = appId; 
this.appSecret = appSecret; 

} 

//获取accesstoken 
public async Task<string> GetAccessToken() 
{ 
if (appId == null || appSecret == null) 
return "ERROR 001";//APPID APPSECRET NULL 
if (accessToken == null || updateTokenTime==null || updateTokenTime.Year == 1 || ((TimeSpan)(DateTime.Now - updateTokenTime)).Minutes > 110) 
{ 
try 
{ 
HttpClient client = new HttpClient(); 
client.DefaultRequestHeaders.ExpectContinue = false; 
string url = String.Format("https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid={0}&secret={1}", appId, appSecret); 
HttpResponseMessage response = await client.GetAsync(url); 
response.EnsureSuccessStatusCode(); 
string result = response.Content.ReadAsStringAsync().Result; 
JObject resultObj = JObject.Parse(result); 
if (resultObj["access_token"] != null) 
{ 
accessToken = (string)resultObj["access_token"]; 
updateTokenTime = DateTime.Now; 
return accessToken; 
} 

} 

catch (Exception e) 
{ 
return "ERROR 000";//HTTP ERROR 
} 


} 
return accessToken; 
} 

//获取jsapiticket 
public async Task<string> GetJsApiTicket() 
{ 

await GetAccessToken(); 
if (accessToken != null) 
{ 

if (jsapiTicket == null || updateJsApiTime ==null|| updateJsApiTime.Year == 1 || ((TimeSpan)(DateTime.Now - updateJsApiTime)).Minutes > 110) 
{ 
try 
{ 
HttpClient client = new HttpClient(); 
client.DefaultRequestHeaders.ExpectContinue = false; 
string url = String.Format("https://api.weixin.qq.com/cgi-bin/ticket/getticket?access_token={0}&type=jsapi", accessToken); 
HttpResponseMessage response = await client.GetAsync(url); 
response.EnsureSuccessStatusCode(); 
string result = response.Content.ReadAsStringAsync().Result; 
JObject resultObj = JObject.Parse(result); 
if ((int)resultObj["errcode"] == 0) 
{ 
jsapiTicket = (string)resultObj["ticket"]; 
updateJsApiTime = DateTime.Now; 
return jsapiTicket; 
} 
else { 
return "ERROR 003";// 
} 
} 
catch (Exception e) 
{ 
return "ERROR 000";//HTTP ERROR 
} 

} 
return jsapiTicket; 
} 
return "ERROR 001";//ACCESSTOKEN NULL 
} 


public async Task<JObject> GetJsApiConfig(string url) 
{ 

await GetJsApiTicket(); 
if (jsapiTicket != null) 
{ 
int timestamp = Convert.ToInt32(DateTime.UtcNow.AddHours(8).Subtract(new DateTime(1970, 1, 1)).TotalSeconds); 
string nonceStr = Guid.NewGuid().ToString().Replace("-", "").ToLower(); ; 
string string1 = String.Format("jsapi_ticket={0}&noncestr={1}×tamp={2}&url={3}", jsapiTicket, nonceStr, timestamp, url); 
SHA1 sha1 = new SHA1CryptoServiceProvider(); 
byte[] bytes_sha1_in = UTF8Encoding.Default.GetBytes(string1); 
byte[] bytes_sha1_out = sha1.ComputeHash(bytes_sha1_in); 
string signature = BitConverter.ToString(bytes_sha1_out).Replace("-", "").ToLower(); 
JObject returnObj = new JObject(); 
returnObj["appId"] = appId; 
returnObj["timestamp"] = timestamp; 
returnObj["nonceStr"] = nonceStr; 
returnObj["signature"] = signature; 
returnObj["url"] = url; 
return returnObj; 
} 
return null; 


} 


} 

public class TestWeixinInfo : WeixinInfo 
{ 
public static string appId = ""; 
private static string appSecret = ""; 
public TestWeixinInfo() 
: base(appId, appSecret) 
{ 

} 
} 

public class Test2WeixinInfo : WeixinInfo 
{ 
public static string appId = ""; 
private static string appSecret = ""; 
public Test2WeixinInfo() 
: base(appId, appSecret) 
{ 

} 
} 

public class WyWeixinInfo : WeixinInfo 
{ 

public static string appId = "";// ""; 
private static string appSecret = "";// ""; 
public WyWeixinInfo() 
: base(appId, appSecret) 
{ 

} 
} 


public class WeixinUtil 
{ 
private static List<WeixinInfo> WEIXININFOS = new List<WeixinInfo>(); 

public static void AddWeixinInfo(WeixinInfo wxInfo) 
{ 
if (GetWeixinInfoByAppId(wxInfo.appId) == null) 
WEIXININFOS.Add(wxInfo); 
} 

public static WeixinInfo GetWeixinInfoByAppId(string appId) 
{ 
foreach (WeixinInfo wxInfo in WEIXININFOS) 
{ 
if (wxInfo.appId.Equals(appId)) 
return wxInfo; 
} 
return null; 
} 


public static WeixinInfo GetTestWeixinInfo() 
{ 
WeixinInfo weixinInfo = GetWeixinInfoByAppId(TestWeixinInfo.appId); 
if (weixinInfo == null) 
{ 
weixinInfo = new TestWeixinInfo(); 
AddWeixinInfo(weixinInfo); 

} 
return weixinInfo; 
} 


public static WeixinInfo GetTest2WeixinInfo() 
{ 
WeixinInfo weixinInfo = GetWeixinInfoByAppId(Test2WeixinInfo.appId); 
if (weixinInfo == null) 
{ 
weixinInfo = new Test2WeixinInfo(); 
AddWeixinInfo(weixinInfo); 
} 
return weixinInfo; 
} 

public static WeixinInfo GetWyWeixinInfo() 
{ 
WeixinInfo weixinInfo = GetWeixinInfoByAppId(WyWeixinInfo.appId); 
if (weixinInfo == null) 
{ 
weixinInfo = new WyWeixinInfo(); 
AddWeixinInfo(weixinInfo); 

} 
return weixinInfo; 
} 
} 
}
```