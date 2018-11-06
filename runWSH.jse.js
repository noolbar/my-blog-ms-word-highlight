// writer : @standard-software
// article: https://qiita.com/standard-software/items/82cfad075decd42aba92 (ja)
var fso = WScript.CreateObject("Scripting.FileSystemObject")
var basePath = fso.GetParentFolderName(WScript.ScriptFullName);

//wshではalertがないので定義する
function alert(messageText) {
  WScript.Echo(messageText);
}

//テキスト ファイル 入出力
var encodingTypeJpCharCode = {
  NONE                :0,
  ASCII               :1,
  JIS                 :2,
  EUC_JP              :3,
  UTF_7               :4,
  Shift_JIS           :5,
  UTF8_BOM            :6,
  UTF8_BOM_NO         :7,
  UTF16_LE_BOM        :8,
  UTF16_LE_BOM_NO     :9,
  UTF16_BE_BOM        :10,
  UTF16_BE_BOM_NO     :11
}

function getEncodingTypeName(encodingType) {
  switch (encodingType) {
  case encodingTypeJpCharCode.Shift_JIS: 
    return "SHIFT_JIS";

  case encodingTypeJpCharCode.UTF16_LE_BOM:
    return "UNICODEFFFE";
  case encodingTypeJpCharCode.UTF16_LE_BOM_NO:
    return "UTF-16LE";

  case encodingTypeJpCharCode.UTF16_BE_BOM:
    return "UNICODEFEFF";
  case encodingTypeJpCharCode.UTF16_BE_BOM_NO:
    return "UTF-16BE";

  case encodingTypeJpCharCode.UTF8_BOM:
    return "UTF-8";
  case encodingTypeJpCharCode.UTF8_BOM_NO:
    return "UTF-8N";

  case encodingTypeJpCharCode.JIS:
    return "ISO-2022-JP";

  case encodingTypeJpCharCode.EUC_JP:
    return "EUC-JP";

  case encodingTypeJpCharCode.UTF_7:
    return "UTF-7";
  }
}

function string_LoadFromFile(filePath, encodingType) {
  var result = '';
  var encordingName = getEncodingTypeName(encodingType)

  var stream = WScript.CreateObject('ADODB.Stream');
  stream.Type = 2;        //(adTypeText = 2)
  switch (encodingType) {
  case encodingTypeJpCharCode.UTF8_BOM_NO: 
    stream.Charset = getEncodingTypeName(encodingTypeJpCharCode.UTF8_BOM);
    break;
  default: 
    stream.Charset = encordingName;
    break;
  }
  stream.Open();
  stream.LoadFromFile(filePath);
  result = stream.ReadText();
  stream.Close();
  return result;
}

var includeFileName = "./src/prism.js"
eval( 
  string_LoadFromFile(
    fso.BuildPath(basePath, includeFileName), 
    encodingTypeJpCharCode.UTF8_BOM_NO));

// var includeFileName = "./libB.js"
// eval( 
//   string_LoadFromFile(
//     fso.BuildPath(basePath, includeFileName), 
//     encodingTypeJpCharCode.UTF8_BOM_NO));

var includeFileName = "./src/main.js"
eval( 
  string_LoadFromFile(
    fso.BuildPath(basePath, includeFileName), 
    encodingTypeJpCharCode.UTF8_BOM_NO));
//--------------------------------------------------
//SHIFT_JISの場合下記のようにする
//eval( 
//    fso.OpenTextFile(
//        fso.BuildPath(basePath, includeFileName), 1)
//    .ReadAll() );
//--------------------------------------------------


var outstream = WScript.CreateObject("ADODB.Stream");
outstream.Mode = 3;
outstream.Type = 2; //(adTypeText = 2)
outstream.Charset = getEncodingTypeName(encodingTypeJpCharCode.UTF8_BOM);
outstream.Open();
// WScript.Echo(WScript.Arguments(0));
// WScript.Echo(WScript.Arguments(1));
main(WScript.Arguments(0), outstream);

outstream.SaveToFile(WScript.Arguments(1), 2); //overwrite
outstream.Close();