/**
 * Website - Google Apps Script Backend & Live Dynamic Loader
 * Script ID: 1YZxESag34744KYNigqJNU6wOqre6t1J5YBhBXcWYypyisNgLA-ydTdCY
 * 
 * -------------------------------------------------------------
 * ZERO-MAINTENANCE LIVE AUTO-UPDATE ENGINE:
 * -------------------------------------------------------------
 * Is script ko GAS me sirf 1-baar 'Deploy' karna padta hai.
 * Uske baad jab bhi Antigravity GitHub par index.html edit karega,
 * Web App URL par INSTANT LIVE UPDATE dikhega (0 manual pull, 0 manual deploy)!
 */

var GITHUB_RAW_URL = "https://raw.githubusercontent.com/yashmbarlota007/Website/main/index.html";

function doGet(e) {
  try {
    // Cache buster ensures Google never serves old cached versions
    var cacheBuster = new Date().getTime();
    var fetchUrl = GITHUB_RAW_URL + "?v=" + cacheBuster;
    
    var response = UrlFetchApp.fetch(fetchUrl, {
      muteHttpExceptions: true,
      headers: {
        "Cache-Control": "no-cache, no-store, must-revalidate",
        "Pragma": "no-cache"
      }
    });
    
    if (response.getResponseCode() === 200) {
      return HtmlService.createHtmlOutput(response.getContentText())
        .setTitle("Website | Live")
        .addMetaTag("viewport", "width=device-width, initial-scale=1, maximum-scale=1.0, user-scalable=no")
        .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
    } else {
      return HtmlService.createHtmlOutput("<h2>Error loading live page from GitHub. HTTP Status: " + response.getResponseCode() + "</h2>");
    }
  } catch (err) {
    return HtmlService.createHtmlOutput("<h2>Live Loader Exception: " + err.message + "</h2>");
  }
}

function doPost(e) {
  try {
    var rawData = e && e.postData && e.postData.contents ? e.postData.contents : "{}";
    var payload = JSON.parse(rawData);
    var action = payload.action || "";
    
    var result = handleApiAction(action, payload);
    
    return ContentService.createTextOutput(JSON.stringify(result))
      .setMimeType(ContentService.MimeType.JSON);
  } catch(err) {
    return ContentService.createTextOutput(JSON.stringify({ success: false, error: err.message }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function handleApiAction(action, payload) {
  switch(action) {
    case "ping":
      return { success: true, message: "Website backend is live & connected!", timestamp: new Date().toISOString() };
    default:
      return { success: true, message: "Received action: " + action, data: payload };
  }
}