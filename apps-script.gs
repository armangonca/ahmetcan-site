/**
 * Bu dosya yalnızca referanstır — GitHub'da çalışmaz.
 * İçeriğini olduğu gibi https://script.google.com adresindeki
 * mevcut Apps Script projenize yapıştırıp deploy edin.
 *
 * Adımlar:
 *   1. https://script.google.com → mevcut "anket-backend" projeni aç
 *   2. Tüm eski kodu sil, bu dosyanın içeriğini yapıştır
 *   3. Aşağıdaki SHEET_ID ve ADMIN_PASSWORD değerlerini doldur
 *   4. Disket ikonu (kaydet)
 *   5. Sağ üst → Deploy → Manage deployments → mevcut sürümün yanında kalem (✎)
 *      → "Version: New version" seç → Deploy
 *      (URL aynı kalır, frontend'i değiştirmeye gerek yok)
 */

const SHEET_ID = 'BURAYA_SHEET_ID_YAPISTIR';
const ADMIN_PASSWORD = 'BURAYA_GUCLU_BIR_SIFRE_YAZ';

const DEFAULT_SETTINGS = {
  title: 'Fırlatma Sporcuları için Fonksiyonel Kol Ölçeği',
  description: 'Bu anket, Hacettepe Üniversitesi Spor Fizyoterapistliği Tezi kapsamında FAST-TR anketinin geçerlilik ve güvenirliğini değerlendirmek amacıyla hazırlanmıştır. Anketi cevaplamanız 10–15 dakika sürecek olup verdiğiniz cevaplar tamamen gizli tutulacaktır. Katılımınız için teşekkür ederiz.'
};

const DEFAULT_QUESTIONS = [{"kind":"text","title":"Ad Soyad"},{"kind":"choice","title":"Aşağıdaki spor dallarından hangisini yaptığınızı seçiniz.","options":["Voleybol","Tenis","Badminton","Su topu","Amerikan Futbolu","Hentbol","Beyzbol","Kriket"]},{"kind":"choice","title":"Omuz ağrınız var mı?","options":["Omuz problemim yok, spora devam ediyorum.","Omuz problemim var, spora deva edemiyorum.","Omuz problemim var /omuz problemim vardı, ancak spora devam ediyorum"]},{"kind":"choice","title":"Cinsiyet","options":["Kadın","Erkek"]},{"kind":"text","title":"Yaş"},{"kind":"text","title":"Boy Uzunluğu(m)"},{"kind":"text","title":"Vücut Ağırlığı(kg)"},{"kind":"choice","title":"En son mezun olduğunuz eğitim düzeyi nedir?","options":["İlkokul/Ortaokul","Lise","Ön Lisans","Lisans","Yüksek Lisans/Doktora"]},{"kind":"text","title":"Spor Deneyimi (yıl)"},{"kind":"choice","title":"Spor Seviyesi","options":["Başlangıç Seviyesi (Beginner):","Orta Seviye (Intermediate)","İleri Seviye (Advanced)"]},{"kind":"text","title":"Son 1 hafta içerisindeki toplam antrenman süreniz nedir?"},{"kind":"scale","title":"Son 1 hafta içerisindeki antrenmanlarınızı göz önünde bulundurarak, ne kadar zorlandığınızı değerlendiriniz.","min":1,"max":10,"labels":["Hiç","Çok zor / maksimum"]},{"kind":"text","title":"Son 1 ay içerisindeki toplam antrenman süreniz nedir?"},{"kind":"scale","title":"Son 1 ay içerisindeki antrenmanlarınızı göz önünde bulundurarak, ne kadar zorlandığınızı değerlendiriniz.","min":1,"max":10,"labels":["Hiç","Çok zor/maksimum"]},{"kind":"section","title":"Fırlatma Sporcuları için Fonksiyonel Kol Ölçeği"},{"kind":"choice","title":"1. Kolunuzun şu anki halinden ne kadar memnunsunuz?","options":["Tamamen memnunum","Aşırı memnunum","Orta düzeyde memnunum","Biraz memnunum","Hiç memnun değilim"]},{"kind":"choice","title":"2. Isındıktan sonra, atışa (maça/egzersize/spora) başlamadan önce etkilenmiş kolunuzda ne kadar ağrı hissediyorsunuz?","options":["Hiç yok","Hafif düzeyde","Orta düzeyde","Şiddetli","Çok şiddetli düzeyde"]},{"kind":"choice","title":"3. Geceleri kolunuzda ne düzeyde ağrı veya rahatsızlık hissediyorsunuz?","options":["Hiç yok","Hafif düzeyde","Orta düzeyde","Şiddetli","Çok şiddetli düzeyde"]},{"kind":"choice","title":"4. Kolunuzdaki yaralanma/problem sonucunda kolunuzda ne kadar kuvvet kaybı yaşadınız?","options":["Hiç yok","Hafif düzeyde","Orta düzeyde","Şiddetli","Çok şiddetli düzeyde"]},{"kind":"choice","title":"5. Uzanma içeren gündelik aktiviteler sırasında kolunuzda ne kadar ağrı veya rahatsızlık olur?","options":["Hiç yok","Hafif düzeyde","Orta düzeyde","Şiddetli","Çok şiddetli düzeyde"]},{"kind":"choice","title":"6. Kolunuzu 30 dakikadan uzun süren aktivitelerde kullanırsanız, kolunuzda ne kadar ağrı veya rahatsızlık olur?","options":["Hiç yok","Hafif düzeyde","Orta düzeyde","Şiddetli","Çok şiddetli düzeyde"]},{"kind":"choice","title":"7.  Kol yaralanmanız/probleminiz,  sporunuzda ilerleme yeteneğinizi ne ölçüde kısıtladı?","options":["Hiç","Biraz","Orta düzeyde","Çok","Aşırı"]},{"kind":"choice","title":"8.   Kol yaralanmanızın/probleminizin daha da kötüleşmemesi için davranışlarınızı ne kadar değiştirdiniz?","options":["Hiç","Biraz","Orta düzeyde","Çok","Aşırı"]},{"kind":"choice","title":"9.  Kolunuzki yaralanmanın/problemin başlangıcından bu yana, hayata karşı daha olumsuz bakış açınız oldu mu?","options":["Hiç","Biraz","Orta düzeyde","Çok","Aşırı"]},{"kind":"choice","title":"10.  Kol yaralanmanız/probleminiz, spor dışında, sizin için önemli şeyleri ne kadar etkiliyor?","options":["Hiç","Biraz","Orta düzeyde","Çok","Aşırı"]},{"kind":"choice","title":"11.  Geceleri kolunuz ne kadar sert/katıdır?","options":["Hiç","Biraz","Orta düzeyde","Çok","Aşırı"]},{"kind":"choice","title":"12.  Kolunuzda yaralanma /problem olduğundan bu yana oyun süreniz ne kadar azaldı?","options":["Hiç","Biraz","Orta düzeyde","Çok","Aşırı"]},{"kind":"choice","title":"13. Giyinmek için kolunuzu başınızın üzerine kaldırdığınızda ne kadar kısıtlanıyorsunuz?","options":["Hiç","Biraz","Orta düzeyde","Çok","Aşırı"]},{"kind":"choice","title":"14. Kolunuzda yaralanma /problem olduğundan beri hayattan aldığınız keyif azaldı mı?","options":["Hayır","Evet, hafif düzeyde","Evet, orta düzeyde","Evet, ciddi düzeyde","Evet, aşırı derecede"]},{"kind":"choice","title":"15. Kolunuzdaki yaralanma/problem tek bir antrenman veya maç sırasında atışa devam edebilme sürenizi azalttı mı?","options":["Hayır","Evet, hafif düzeyde","Evet, orta düzeyde","Evet, ciddi düzeyde","Evet, aşırı derecede"]},{"kind":"choice","title":"16. Kolunuzda yaralanma /problem olduğundan bu yana sportif başarılarınız azaldı mı?","options":["Hayır","Evet, hafif düzeyde","Evet, orta düzeyde","Evet, ciddi düzeyde","Evet, aşırı derecede"]},{"kind":"choice","title":"17.  Kolunuzdaki yaralanma/problem sebebiyle hayatınız daha stresli hale geldi mi?","options":["Hayır","Evet, hafif düzeyde","Evet, orta düzeyde","Evet, ciddi düzeyde","Evet, aşırı derecede"]},{"kind":"choice","title":"18. Kolunuzdaki yaralanma/problem “uzak mesafeye atış/fırlatma(servis, smaç, clear, şut)  ” yapabilme yeteneğinizi ne kadar kısıtladı?","options":["Hiç","Biraz","Orta düzeyde","Çok","Fırlatma yapamıyorum"]},{"kind":"choice","title":"19. Kolunuzda yaralanma /problem olduğundan  bu yana beri atış isabet oranınız ne ölçüde azaldı?","options":["Hiç","Biraz","Orta düzeyde","Çok","Fırlatma yapamıyorum"]},{"kind":"choice","title":"20. Atış/fırlatma (servis, smaç, clear, şut)  sırasında kolunuzu ne kadar zayıf hissediyorsunuz?","options":["Hiç","Biraz","Orta düzeyde","Çok","Fırlatma yapamıyorum"]},{"kind":"choice","title":"21. Maç temposunda/makisumum eforla atış/fırlatma (servis, smaç, clear, şut)  yaparken kolunuz ne kadar ağrılıdır?","options":["Hiç","Biraz","Orta düzeyde","Çok","Fırlatma yapamıyorum"]},{"kind":"choice","title":"%50–75 eforda atış/fırlatma yaparken kolunuz ne kadar ağrılıdır?","options":["Hiç","Biraz","Orta düzeyde","Çok","Fırlatma yapamıyorum"]},{"kind":"section","title":"Atıcı, Şutör, Smaçör Modülü"},{"kind":"choice","title":"A1. Kolunuzdaki yaralanma atış hızınızı ne kadar kısıtladı?","options":["Hiç","Biraz","Orta Düzeyde","Çok","Yapamıyorum"]},{"kind":"choice","title":"A2. Kolunuzdaki yaralanma “ısınma atışlarınızı” gerçekleştirebilmenizi ne kadar kısıtladı?","options":["Hiç","Biraz","Orta Düzeyde","Çok","Yapamıyorum"]},{"kind":"choice","title":"A3. Kolunuzdaki yaralanma hedeflediğiniz noktaları ‘isabetleme’ yeteneğinizi  ne kadar kısıtladı?","options":["Hiç","Biraz","Orta Düzeyde","Çok","Yapamıyorum"]},{"kind":"choice","title":"A4. Atış yapmak için sahaya/yarışa girme sırası  (rotasyon sırası) size  geldiğinde atış yapabilme yeteneğiniz ne kadar kısıtlandı?","options":["Hiç","Biraz","Orta Düzeyde","Çok","Yapamıyorum"]},{"kind":"choice","title":"A5. Kolunuzdaki yaralanma sonrasında genel olarak atış yapma istatistikleriniz ne ölçüde olumsuz etkilendi?","options":["Hiç","Biraz","Orta Düzeyde","Çok","Yapamıyorum"]},{"kind":"choice","title":"A6. Kolunuzdaki yaralanma sebebiyle toplam atış sayısınız ne kadar azaldı?","options":["Hiç","Biraz","Orta Düzeyde","Çok","Yapamıyorum"]},{"kind":"choice","title":"A7. Kolunuzdaki yaralanma farklı tiplerde atışları yapabilme yeteneğinizi ne kadar kısıtladı?","options":["Hiç","Biraz","Orta Düzeyde","Çok","Yapamıyorum"]},{"kind":"choice","title":"A8. Kolunuzdaki yaralanmadan sonra atış ‘hissinde’ bir azalma oldu mu?","options":["Hiç","Biraz","Orta Düzeyde","Çok","Yapamıyorum"]},{"kind":"choice","title":"A9.Kolunuzdaki problemin başlangıcından  sonra maç/yarış sırasındanki  sahada geçirilen süre dışında saha kenarında toparlanmak için daha fazla zamana ihtiyaç duyuyor musunuz ?","options":["Hiç","Biraz","Orta Düzeyde","Çok","Yapamıyorum"]},{"kind":"section","title":"Kerlan-Jobe Omuz ve Dirsek Skoru"},{"kind":"scale","title":"1.    Antrenman ya da müsabaka öncesinde gevşemek ya da ısınmak sizin için ne kadar zordur?","min":1,"max":10,"labels":["Antrenman ya da müsabaka süresince asla gevşemiş hissedilmez ","Normal ısınma süresi"]},{"kind":"scale","title":"2.    Omzunuzda ya da dirseğinizde ne kadar ağrı hissediyorsunuz?","min":1,"max":10,"labels":["",""]},{"kind":"scale","title":"3. Omzunuzda ya da dirseğinizde ne kadar zayıflık ve/veya yorgunluk (ör. kuvvet kaybı) hissediyorsunuz","min":1,"max":10,"labels":["Müsabakayı engelleyen zayıflık ya da yorgunluk","Zayıflık yok,normal müsabaka yorgunluğu"]},{"kind":"scale","title":"4. Müsabaka sırasında omzunuzu ya da dirseğinizi ne kadar güvensiz hissederdiniz?","min":1,"max":10,"labels":["",""]},{"kind":"scale","title":"5.Kolunuzdaki problemler antrenör, yönetim ve görevlilerle ilişkilerinizi ne kadar etkiledi?","min":1,"max":10,"labels":["Takımdan ayrılma,takas, sözleşme feshi ya da burs kaybı","Hiç etkilemedi"]},{"kind":"scale","title":"6.  Kolunuzdan dolayı fırlatma, servis, smaç gibi hareketlerde ne kadar değişiklik yapmak zorunda kaldınız?","min":1,"max":10,"labels":["Tamamen değişti, hareketi artık yapamıyor","Hareket değişikliği yok"]},{"kind":"scale","title":"7.Kolunuzdan dolayı hızınız ve/veya gücünüz ne kadar zarar gördü?","min":1,"max":10,"labels":["Tüm güçte kayıp, pozisyonda değişiklik.","Hız/güç değişikliği yok"]},{"kind":"scale","title":"8.Kolunuzdan dolayı müsabaka dayanıklılığınız ne kadar azaldı?","min":1,"max":10,"labels":["Belirgin azalma(yedek oyuncu olma,örneğin daha kısa sürede yarışma)","Müsabaka dayanıklılığında azalma yok"]},{"kind":"scale","title":"9.Kolunuzdan dolayı hareket hakimiyetinde (fırlatma, servis, smaç gibi hareketlerde) ne kadar bozulma oldu?","min":1,"max":10,"labels":["Tüm fırlatma, servis, smaç gibi hareketlerde öngörülemeyen hakimiyet kaybı.","Hakimiyet kaybı yok"]},{"kind":"scale","title":"10.Kolunuzun güncel spor yarışma seviyenizi ne kadar etkilediğini düşünüyorsunuz (ör. kolunuz tüm potansiyelinizi kullanmaktan sizi alıkoyuyor mu)?","min":1,"max":10,"labels":["Yarışamıyor,spor branşını değiştirmk zorunda kalmış.","İstenilen yarışma seviyesi"]},{"kind":"section","title":"QUİCK DASH"},{"kind":"scale","title":"1-Sıkı kapatılmış yada yeni bir kavanozu açmak","min":1,"max":5,"labels":["Zorluk yok","Hiç yapamama"]},{"kind":"scale","title":"2-Ağır ev işleri yapmak(duvar silmek, yer silmek,tamirat yapmak vs.)","min":1,"max":5,"labels":["Zorluk yok","Hiç yapamama"]},{"kind":"scale","title":"3-Alışveriş çantası yada evrak çantası taşımak","min":1,"max":5,"labels":["Zorluk yok","Hiç yapamama"]},{"kind":"scale","title":"4-Sırtını yıkamak","min":1,"max":5,"labels":["Zorluk yok","Hiç yapamama"]},{"kind":"scale","title":"5-Yiyecekleri kesmek için bıçak kullanmak","min":1,"max":5,"labels":["Zorluk yok","Hiç yapamama"]},{"kind":"scale","title":"6-Kolunuzdan, omzunuzdan veya elinizden güç aldığınız veya darbe vurduğunuz eğlenceye yönelik etkinlikler (önünüzde yerde bulunan bir konserve kutusu veya küçük bir taşa iki elinizle kavradığınız bir sopayla yandan vurmak,tenis oynamak,pinpon oynamak )","min":1,"max":5,"labels":["Zorluk yok","Hiç yapamama"]},{"kind":"scale","title":"7-Son hafta süresince kol omuz yada el probleminiz aile arkadaşlar, komşular veya gruplarla normal  sosyal etkinliklerinize ne ölçüde engel oldu ","min":1,"max":5,"labels":["Engel yok","Aşırı"]},{"kind":"scale","title":"8-Son hafta süresince kol omuz yada el sorununuz  nedeniyle işinizde yada diğer günlük etkinliklerde kısıtlandınız mı? ","min":1,"max":5,"labels":["Hiç kısıtlanmış hissetmiyorum","Bedensel etkinlik yapamyorum"]},{"kind":"scale","title":"9-El, omuz ya da kol ağrınız","min":1,"max":5,"labels":["Yok","Aşırı"]},{"kind":"scale","title":"10-El,omuz yada kolunuzdaki karıncalanma(iğnelenme) ","min":1,"max":5,"labels":["Yok","Aşırı"]},{"kind":"scale","title":"11-Geçen hafta içinde el, omuz yada kol ağrınız nedeniyle uyumada ne kadar zorlandınız ?","min":1,"max":5,"labels":["Zorluk yok","O kadar zorluk var ki uyuyamıyorum"]},{"kind":"section","title":"SPORCU MODÜLÜ"},{"kind":"scale","title":"1-Spor yaparken eski tekniğinizi kullanmada zorluğunuz oldu mu ? ","min":1,"max":5,"labels":["Zorluk yok","Hiç yapamama"]},{"kind":"scale","title":"2-Kolunuz, omzunuz ve el ağrınız nedeniyle  eskisi gibi  spor yapmada zorluğunuz oldu mu?","min":1,"max":5,"labels":["Zorluk yok","Hiç yapamama"]},{"kind":"scale","title":"3-İstediğiniz kadar iyi spor yapmada zorluğunuz oldu mu? ","min":1,"max":5,"labels":["Zorluk yok","Hiç yapamama"]},{"kind":"scale","title":"4- Her zamanki süre kadar  spor yaparken zorluğunuz oldu mu","min":1,"max":5,"labels":["Zorluk yok","Hiç yapamama"]}];

// ───── Sheet yardımcıları ─────

function getDoc() {
  return SpreadsheetApp.openById(SHEET_ID);
}

function getAnswerSheet() {
  const doc = getDoc();
  let s = doc.getSheetByName('Cevaplar');
  if (!s) s = doc.insertSheet('Cevaplar');
  return s;
}

function getQuestionSheet() {
  const doc = getDoc();
  let s = doc.getSheetByName('Sorular');
  if (!s) {
    s = doc.insertSheet('Sorular');
    bootstrapQuestionSheet(s);
  } else if (s.getLastRow() <= 1) {
    bootstrapQuestionSheet(s);
  }
  return s;
}

function bootstrapQuestionSheet(sheet) {
  sheet.clear();
  const headers = ['sira', 'tip', 'baslik', 'secenekler', 'min', 'max', 'etiket_min', 'etiket_max', 'step'];
  const rows = [headers];
  DEFAULT_QUESTIONS.forEach(function(q, i) {
    rows.push(questionToRow(q, i));
  });
  sheet.getRange(1, 1, rows.length, headers.length).setValues(rows);
}

function questionToRow(q, i) {
  return [
    i + 1,
    q.kind || '',
    q.title || '',
    Array.isArray(q.options) ? q.options.join('|') : '',
    (q.min === 0 || q.min) ? q.min : '',
    (q.max === 0 || q.max) ? q.max : '',
    (q.labels && q.labels[0]) ? q.labels[0] : '',
    (q.labels && q.labels[1]) ? q.labels[1] : '',
    q.step || ''
  ];
}

function readQuestions() {
  const sheet = getQuestionSheet();
  const data = sheet.getDataRange().getValues();
  if (data.length < 2) return [];
  const headers = data[0];
  return data.slice(1).map(function(r) {
    const obj = {};
    headers.forEach(function(h, i) { obj[h] = r[i]; });
    if (!obj.tip || !obj.baslik) return null;
    const q = { kind: String(obj.tip), title: String(obj.baslik) };
    if (q.kind === 'choice') {
      q.options = String(obj.secenekler || '')
        .split('|').map(function(s){ return s.trim(); })
        .filter(function(s){ return s.length > 0; });
    }
    if (q.kind === 'scale') {
      q.min = Number(obj.min) || 1;
      q.max = Number(obj.max) || 10;
      q.labels = [String(obj.etiket_min || ''), String(obj.etiket_max || '')];
      if (obj.step) q.step = Number(obj.step);
    }
    return q;
  }).filter(function(q){ return q !== null; });
}

function getSettingsSheet() {
  const doc = getDoc();
  let s = doc.getSheetByName('Ayarlar');
  if (!s) {
    s = doc.insertSheet('Ayarlar');
    bootstrapSettingsSheet(s);
  } else if (s.getLastRow() < 2) {
    bootstrapSettingsSheet(s);
  }
  return s;
}

function bootstrapSettingsSheet(sheet) {
  sheet.clear();
  sheet.getRange(1, 1, 1, 2).setValues([['anahtar', 'deger']]);
  const rows = [
    ['title', DEFAULT_SETTINGS.title],
    ['description', DEFAULT_SETTINGS.description],
  ];
  sheet.getRange(2, 1, rows.length, 2).setValues(rows);
}

function readSettings() {
  const sheet = getSettingsSheet();
  const data = sheet.getDataRange().getValues();
  const settings = { title: DEFAULT_SETTINGS.title, description: DEFAULT_SETTINGS.description };
  for (let i = 1; i < data.length; i++) {
    const key = String(data[i][0] || '').trim();
    const value = String(data[i][1] || '');
    if (key) settings[key] = value;
  }
  return settings;
}

function writeSettings(settings) {
  const doc = getDoc();
  let sheet = doc.getSheetByName('Ayarlar');
  if (!sheet) sheet = doc.insertSheet('Ayarlar');
  sheet.clear();
  const rows = [['anahtar', 'deger']];
  Object.keys(settings).forEach(function(key) {
    rows.push([key, String(settings[key] == null ? '' : settings[key])]);
  });
  sheet.getRange(1, 1, rows.length, 2).setValues(rows);
}

function writeQuestions(questions) {
  const doc = getDoc();
  let sheet = doc.getSheetByName('Sorular');
  if (!sheet) sheet = doc.insertSheet('Sorular');
  sheet.clear();
  const headers = ['sira', 'tip', 'baslik', 'secenekler', 'min', 'max', 'etiket_min', 'etiket_max', 'step'];
  const rows = [headers];
  questions.forEach(function(q, i) {
    rows.push(questionToRow(q, i));
  });
  if (rows.length > 0) {
    sheet.getRange(1, 1, rows.length, headers.length).setValues(rows);
  }
}

// ───── HTTP handler'lar ─────

function doGet(e) {
  return jsonResponse({
    ok: true,
    questions: readQuestions(),
    settings: readSettings(),
  });
}

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    const action = data.action || 'submit';

    if (action === 'submit') return handleSubmit(data);
    if (action === 'admin_load') return handleAdminLoad(data);
    if (action === 'admin_save') return handleAdminSave(data);

    return jsonResponse({ ok: false, error: 'unknown action: ' + action });
  } catch (err) {
    return jsonResponse({ ok: false, error: String(err) });
  }
}

function handleSubmit(data) {
  const sheet = getAnswerSheet();
  const answers = data.answers || [];
  const email = String(data.email || '').trim().toLowerCase();

  if (!email) return jsonResponse({ ok: false, reason: 'no-email' });

  const lastRow = sheet.getLastRow();

  // E-posta dedup (header satırı varsa, 2. satırdan başla)
  if (lastRow > 1) {
    const emails = sheet.getRange(2, 2, lastRow - 1, 1).getValues()
      .map(function(r){ return String(r[0]).trim().toLowerCase(); });
    if (emails.indexOf(email) >= 0) {
      return jsonResponse({ ok: false, reason: 'duplicate' });
    }
  }

  // İlk gönderim → header satırı yaz
  if (lastRow === 0) {
    const headerRow = ['Gönderim Zamanı', 'E-posta'].concat(
      answers.map(function(a){ return a.q; })
    );
    sheet.appendRow(headerRow);
  }

  const row = [new Date(), email].concat(
    answers.map(function(a){ return a.value == null ? '' : a.value; })
  );
  sheet.appendRow(row);

  return jsonResponse({ ok: true });
}

function handleAdminLoad(data) {
  if (data.password !== ADMIN_PASSWORD) {
    return jsonResponse({ ok: false, reason: 'auth' });
  }
  return jsonResponse({
    ok: true,
    questions: readQuestions(),
    settings: readSettings(),
  });
}

function handleAdminSave(data) {
  if (data.password !== ADMIN_PASSWORD) {
    return jsonResponse({ ok: false, reason: 'auth' });
  }
  if (Array.isArray(data.questions)) {
    writeQuestions(data.questions);
  }
  if (data.settings && typeof data.settings === 'object') {
    writeSettings(data.settings);
  }
  return jsonResponse({ ok: true });
}

function jsonResponse(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
