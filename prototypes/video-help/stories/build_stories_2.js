const fs = require('fs');
const path = require('path');

const stories = [
  {
    id: 'f',
    title: 'قصة المستخدم: القصص التفاعلية (Approach F)',
    role: 'المستخدم عبر الجوال (Mobile User)',
    action: 'مشاهدة فيديوهات المساعدة بتنسيق القصص (Stories) بملء الشاشة',
    benefit: 'الحصول على تجربة مشاهدة حديثة وسريعة مشابهة لتطبيقات التواصل الاجتماعي',
    flow: [
      'ينقر المستخدم على حلقات التصنيفات الدائرية أعلى الشاشة.',
      'تُفتح واجهة القصص بملء الشاشة بخلفية داكنة.',
      'يُعرض شريط تقدم مقسم في الأعلى يوضح عدد الفيديوهات في التصنيف.',
      'ينقر المستخدم على يسار الشاشة للتقديم أو يمينها للرجوع (في بيئة RTL).',
      'بعد انتهاء آخر فيديو في التصنيف، تُغلق نافذة القصص تلقائياً.'
    ],
    altFlows: [
      'الإغلاق اليدوي: ينقر المستخدم على علامة (X) في الأعلى للعودة للتطبيق في أي وقت.'
    ],
    assumptions: [
      'الواجهة مصممة لتكون ممتازة على الجوال بالأساس.',
      'التمرير (Swipe) مدعوم على الهواتف للتقليب بين الفيديوهات.'
    ],
    criteria: [
      { scenario: 'التقليب اليدوي', given: 'المستخدم يشاهد القصة 1', when: 'ينقر على النصف الأيسر من الشاشة', then: 'ينتقل للقصة 2 ويمتلئ مؤشر القصة 1' },
      { scenario: 'الانتهاء التلقائي', given: 'الفيديو يعمل', when: 'يصل الفيديو لنهايته', then: 'ينتقل النظام تلقائياً للقصة التالية' }
    ],
    prototype: '../video-help-f.html'
  },
  {
    id: 'g',
    title: 'قصة المستخدم: المساعد الذكي Chatbot (Approach G)',
    role: 'المستخدم المبتدئ (Novice User)',
    action: 'سؤال المساعد الذكي عن كيفية أداء مهمة معينة',
    benefit: 'الحصول على الفيديو المناسب دون الحاجة للبحث اليدوي أو معرفة اسم التصنيف',
    flow: [
      'يفتح المستخدم نافذة الدردشة من الأيقونة العائمة.',
      'يرسل المساعد رسالة ترحيبية مع أزرار ردود سريعة (مثال: "طريقة إضافة عميل").',
      'يختار المستخدم أحد الأزرار، أو يكتب سؤاله في مربع النص.',
      'يُحلل المساعد السؤال ويرد بفيديو تعليمي مضمن داخل الدردشة.',
      'يمكن للمستخدم تشغيل الفيديو مباشرة داخل بطاقة الدردشة.'
    ],
    altFlows: [
      'عدم وجود نتيجة: إذا لم يفهم المساعد السؤال، يعرض رسالة توجيهية للبحث الشامل أو التواصل مع الدعم.'
    ],
    assumptions: [
      'سيتم ربط المساعد بقاعدة بيانات مصغرة (أو ذكاء اصطناعي بسيط) لمطابقة الكلمات المفتاحية بالفيديوهات.'
    ],
    criteria: [
      { scenario: 'فتح الدردشة', given: 'المستخدم في التطبيق', when: 'ينقر أيقونة الدردشة', then: 'تفتح نافذة الدردشة وتظهر رسالة الترحيب مباشرة' },
      { scenario: 'كتابة سؤال', given: 'الدردشة مفتوحة', when: 'يكتب "كيف أرسل فاتورة" ويضغط إرسال', then: 'يرد البوت ببطاقة فيديو "إنشاء عرض سعر أو فاتورة"' },
      { scenario: 'الردود السريعة', given: 'توجد أزرار رد سريع', when: 'ينقر المستخدم على زر', then: 'يتم إرسال النص فوراً ويقوم المساعد بالرد عليه' }
    ],
    prototype: '../video-help-g.html'
  },
  {
    id: 'ae',
    title: 'قصة المستخدم: التوصية رقم 1 (المعالج + الويدجت العائم)',
    role: 'المدير (Admin)',
    action: 'دمج المعالج الترحيبي للمستخدمين الجدد مع زر المساعدة العائم للمستخدمين الحاليين',
    benefit: 'ضمان التوجيه الإجباري للمستخدم الجديد أولاً، ثم توفير مرجع دائم للمساعدة اللاحقة',
    flow: [
      'عند تسجيل الدخول لأول مرة للمحاسب/الموظف، يظهر معالج الإعداد (Wizard) إجبارياً أو اختيارياً.',
      'بعد إكمال المعالج أو تخطيه، يختفي المعالج ولا يظهر من تلقاء نفسه مجدداً.',
      'تظهر الأيقونة العائمة الدائمة في زاوية النظام (Floating Widget).',
      'إذا أراد المستخدم استرجاع معلومة، يفتح الويدجت ويبحث أو يستعرض التصنيفات.',
      'يحتوي الويدجت على زر صريح "إعادة تشغيل جولة الإعداد" لمن يرغب في رؤية المعالج كاملاً مرة أخرى.'
    ],
    altFlows: [
      'المستخدم القديم: لا يظهر المعالج، ويرى الويدجت المساعد فقط.'
    ],
    assumptions: [
      'يتطلب هذا الحل تحديث حالة المستخدم في قاعدة البيانات (IsFirstLogin = False).'
    ],
    criteria: [
      { scenario: 'أول دخول', given: 'حساب جديد', when: 'يسجل الدخول', then: 'يفتح المعالج التفاعلي تلقائياً' },
      { scenario: 'الاستخدام اليومي', given: 'أغلق المعالج سابقاً', when: 'يتصفح النظام', then: 'تظهر فقط الأيقونة العائمة للمساعدة' },
      { scenario: 'إعادة الجولة', given: 'الويدجت مفتوح', when: 'ينقر استعادة جولة الإعداد', then: 'يُفتح المعالج التفاعلي من الخطوة الأولى' }
    ],
    prototype: '../video-help-a.html'
  },
  {
    id: 'bf',
    title: 'قصة المستخدم: التوصية رقم 2 (مركز المساعدة + القصص للجوال)',
    role: 'مستخدم متنوع الأجهزة (Multi-device User)',
    action: 'إتاحة مركز مساعدة مركزي للويب مع واجهة قصص تفاعلية لتطبيق الموبايل',
    benefit: 'تقديم أفضل عرض مرئي للكمبيوتر المكتبي وتجربة مخصصة سريعة للهواتف',
    flow: [
      'إذا كان المستخدم على شاشة سطح المكتب، ينقر "المساعدة" وينتقل لمتصفح مركز المساعدة (Grid).',
      'تُعرض الفيديوهات بوضوح وتفاصيل كاملة مع قوائم بحث متقدمة.',
      'إذا دخل المستخدم من شريط التنقل في تطبيق الهاتف (أو الويب المتجاوب)، يرى واجهة حلقات القصص (Stories).',
      'يتصفح الهاتف بحركة السحب السريعة (Swipe) بين الفيديوهات للتوافق مع الإبهام.'
    ],
    altFlows: [
      'استخدام الأجهزة اللوحية (Tablet): يُعرض مركز المساعدة الشامل كشاشات المكتب نظراً لتوافر المساحة.'
    ],
    assumptions: [
      'سنعتمد على Media Queries أو نوع الجهاز من جهة الخادم لتقديم الواجهة المناسبة.'
    ],
    criteria: [
      { scenario: 'التصفح المكتبي', given: 'شاشة عريضة (> 1024px)', when: 'يطلب المساعدة', then: 'تُفتح صفحة مركز المساعدة الموسعة' },
      { scenario: 'التصفح بالهاتف', given: 'شاشة صغيرة (< 768px)', when: 'يطلب المساعدة', then: 'تظهر الحلقات الدائرية بنمط القصص' }
    ],
    prototype: '../video-help-b.html'
  },
  {
    id: 'ade',
    title: 'قصة المستخدم: التوصية رقم 3 (إمكانية الوصول القصوى D+A+E)',
    role: 'المدير المتقدم (Power Admin)',
    action: 'إتاحة لوحة أوامر واختصارات مع معالج الدخول والويدجت',
    benefit: 'إرضاء كافة أذواق المستخدمين (الباحث السريع، والمستكشف، والمبتدئ)',
    flow: [
      'يتلقى المستخدم المعالج عند أول دخول.',
      'يُستخدم الويدجت للبحث الدائم.',
      'في أي وقت ومن أي شاشة، يمكن استخدام الاختصار (Ctrl+K) لفتح صندوق أوامر المساعدة السريع.'
    ],
    altFlows: [
      'البحث الشامل: صندوق أوامر (Ctrl+K) لا يبحث في المساعدة فقط، بل مقترح أن يدمج للبحث عن فواتير وعملاء.'
    ],
    assumptions: [
      'هذا الحل يتطلب موارد تطوير برمجية أعلى لضبط اختصارات النظام.'
    ],
    criteria: [
      { scenario: 'التنفيذ السريع', given: 'أداة الويدجت مخفية', when: 'يضغط المستخدم Ctrl+K', then: 'تلوح واجهة بحث سريعة لجميع فيديوهات النظام' }
    ],
    prototype: '../video-help-d.html'
  }
];

const template = (story) => `<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${story.title} - Qote.it</title>
    <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+Arabic:wght@400;500;600;700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <style>
        :root {
            --primary: #127EE3;
            --secondary: #49B3C9;
            --bg-main: #F4F6F9;
            --bg-card: #FFFFFF;
            --text-main: #232323;
            --text-secondary: #6B7280;
            --border-color: #E2E8F0;
        }
        body {
            font-family: 'Noto Sans Arabic', sans-serif;
            background-color: var(--bg-main);
            color: var(--text-main);
            margin: 0;
            padding: 40px 20px;
        }
        .container {
            max-width: 900px;
            margin: 0 auto;
            background: var(--bg-card);
            border-radius: 12px;
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
            padding: 40px;
        }
        .header {
            border-bottom: 2px solid var(--bg-main);
            padding-bottom: 20px;
            margin-bottom: 30px;
        }
        .back-link {
            display: inline-flex;
            align-items: center;
            gap: 8px;
            color: var(--text-secondary);
            text-decoration: none;
            font-weight: 500;
            margin-bottom: 20px;
            transition: color 0.2s;
        }
        .back-link:hover { color: var(--primary); }
        h1 { color: var(--primary); margin: 0 0 10px 0; font-size: 24px; }
        h2 { font-size: 18px; color: var(--text-main); margin: 30px 0 15px 0; border-right: 4px solid var(--primary); padding-right: 12px; }
        
        .user-story-box {
            background: #F0F7FF;
            border: 1px solid #D1E5FF;
            border-radius: 8px;
            padding: 20px;
            margin-bottom: 30px;
            font-size: 16px;
            line-height: 1.6;
        }
        .user-story-box strong { color: var(--primary); }
        
        ol, ul { padding-right: 20px; margin-bottom: 20px; line-height: 1.8; color: var(--text-main); }
        li { margin-bottom: 8px; }
        
        table { width: 100%; border-collapse: collapse; margin-bottom: 30px; text-align: right; }
        th, td { border: 1px solid var(--border-color); padding: 14px; }
        th { background: #F8FAFC; font-weight: 600; color: #475569; }
        tr:nth-child(even) { background: #F8FAFC; }
        
        .prototype-link {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            gap: 10px;
            background: var(--primary);
            color: white;
            text-decoration: none;
            padding: 12px 24px;
            border-radius: 6px;
            font-weight: 600;
            font-size: 15px;
            margin-top: 20px;
            transition: background 0.2s;
        }
        .prototype-link:hover { background: #0e65b6; }
    </style>
</head>
<body>
    <div class="container">
        <a href="../index.html" class="back-link">
            <i class="fas fa-arrow-right"></i> العودة إلى صفحة المقارنة
        </a>
        <div class="header">
            <h1>${story.title}</h1>
        </div>
        
        <h2>قصة المستخدم (User Story)</h2>
        <div class="user-story-box">
            بصفتي <strong>[${story.role}]</strong>،<br>
            أريد أن <strong>[${story.action}]</strong>،<br>
            حتى أتمكن من <strong>[${story.benefit}]</strong>.
        </div>

        <h2>تدفق العملية (Process Flow)</h2>
        <ol>
            ${story.flow.map(step => `<li>${step}</li>`).join('\n            ')}
        </ol>

        <h2>المسارات البديلة (Alternative Flows)</h2>
        <ul>
            ${story.altFlows.map(flow => `<li>${flow}</li>`).join('\n            ')}
        </ul>

        <h2>الافتراضات التأسيسية (Assumptions)</h2>
        <ul>
            ${story.assumptions.map(assump => `<li>${assump}</li>`).join('\n            ')}
        </ul>

        <h2>معايير القبول (Acceptance Criteria)</h2>
        <table>
            <thead>
                <tr>
                    <th>السيناريو (Scenario)</th>
                    <th>الحالة المعطاة (Given)</th>
                    <th>عندما (When)</th>
                    <th>إذن (Then)</th>
                </tr>
            </thead>
            <tbody>
                ${story.criteria.map(c => `
                <tr>
                    <td>${c.scenario}</td>
                    <td>${c.given}</td>
                    <td>${c.when}</td>
                    <td>${c.then}</td>
                </tr>
                `).join('')}
            </tbody>
        </table>

        <a href="${story.prototype}" class="prototype-link">
            <i class="fas fa-desktop"></i> مشاهدة التصميم المقترح (Prototype)
        </a>
    </div>
</body>
</html>`;

stories.forEach(story => {
  fs.writeFileSync(path.join(__dirname, 'story-' + story.id + '.html'), template(story));
  console.log('Created story-' + story.id + '.html');
});
