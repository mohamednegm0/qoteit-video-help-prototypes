const fs = require('fs');
const path = require('path');

const stories = [
  {
    id: 'a',
    title: 'قصة المستخدم: ويدجت المساعدة العائم (Approach A)',
    role: 'المستخدم (User)',
    action: 'الوصول إلى قائمة المساعدة عبر أيقونة عائمة في جميع الصفحات',
    benefit: 'إعادة مشاهدة الفيديوهات التعليمية بسهولة دون مغادرة الصفحة الحالية',
    flow: [
      'يقوم المستخدم بالنقر على أيقونة المساعدة (؟) العائمة في أسفل يسار الشاشة.',
      'تظهر نافذة منبثقة تحتوي على شريط بحث وتصنيفات (العملاء، المنتجات، إلخ).',
      'ينقر المستخدم على تصنيف معين لتصفية الفيديوهات.',
      'يختار المستخدم فيديو، فيفتح في نافذة منبثقة (Modal) ويبدأ التشغيل.',
      'يغلق المستخدم النافذة للعودة إلى عمله السابق بأمان.'
    ],
    altFlows: [
      'عملية البحث: يكتب المستخدم في شريط البحث، فتتم تصفية الفيديوهات فورياً.',
      'الخارج: ينقر المستخدم خارج النافذة لإغلاقها بسرعة.'
    ],
    assumptions: [
      'الفيديوهات مستضافة على خادم سريع (CDN).',
      'يتم الاحتفاظ بحالة الصفحة الأصلية (لا يتم إعادة تحميل الصفحة).'
    ],
    criteria: [
      { scenario: 'فتح القائمة', given: 'المستخدم في أي صفحة', when: 'ينقر على الأيقونة العائمة', then: 'تفتح القائمة بحركة ناعمة وتظهر الفيديوهات' },
      { scenario: 'تصفية بالتصنيف', given: 'القائمة مفتوحة', when: 'ينقر على تصنيف "العملاء"', then: 'تظهر فقط الفيديوهات الخاصة بالعملاء' },
      { scenario: 'تشغيل الفيديو', given: 'المستخدم يرى قائمة الفيديوهات', when: 'ينقر على كارت الفيديو', then: 'يفتح مشغل الفيديو في منتصف الشاشة' },
      { scenario: 'إغلاق القائمة', given: 'القائمة مفتوحة', when: 'ينقر المستخدم خارج القائمة', then: 'تُغلق القائمة' }
    ],
    prototype: '../video-help-a.html'
  },
  {
    id: 'b',
    title: 'قصة المستخدم: مركز المساعدة الشامل (Approach B)',
    role: 'المستخدم (User)',
    action: 'تصفح صفحة مخصصة لمركز المساعدة',
    benefit: 'الاطلاع على جميع مقاطع الفيديو التعليمية بشكل منظم مثل مكتبة شاملة',
    flow: [
      'ينتقل المستخدم إلى صفحة "مركز المساعدة" من القائمة الجانبية أو العلوية.',
      'يستعرض المستخدم شبكة الفيديوهات (Grid) المرتبة حسب التصنيفات.',
      'يستخدم شريط البحث الواسع في أعلى الصفحة للبحث المباشر.',
      'ينقر على فيديو ليتم تشغيله في نافذة (Modal) مع ظهور فيديوهات ذات صلة في الجانب.',
      'يمكن للمستخدم رؤية مؤشر يوضح الفيديوهات التي شاهدها.'
    ],
    altFlows: [
      'حالة فارغة: إذا لم يجد البحث نتائج، تظهر شاشة "لا توجد نتائج" مع اقتراحات.'
    ],
    assumptions: [
      'الصفحة عبارة عن مسار (Route) مستقل داخل التطبيق.',
      'سيتم تتبع تقدم المشاهدة لكل مستخدم.'
    ],
    criteria: [
      { scenario: 'تصفح المركز', given: 'المستخدم في لوحة التحكم', when: 'ينقر على "مركز المساعدة"', then: 'ينتقل لصفحة تعرض كافة الفيديوهات' },
      { scenario: 'تشغيل فيديو', given: 'المستخدم في مركز المساعدة', when: 'ينقر على فيديو', then: 'يفتح الفيديو مع قائمة مقترحات جانبية' },
      { scenario: 'البحث الشامل', given: 'المستخدم في مركز المساعدة', when: 'يكتب كلمة في شريط البحث العلوي', then: 'تُفلتر الشبكة فورياً لعرض النتائج' }
    ],
    prototype: '../video-help-b.html'
  },
  {
    id: 'c',
    title: 'قصة المستخدم: مشغل القائمة الجانبية (Approach C)',
    role: 'المستخدم الجديد (New User)',
    action: 'مشاهدة قائمة متسلسلة من الفيديوهات مع بقاء المشغل مفتوحاً',
    benefit: 'التعلم خطوة بخطوة مثل الكورسات التعليمية',
    flow: [
      'يفتح المستخدم واجهة المشغل الجانبي.',
      'يظهر الفيديو الرئيسي في مساحة واسعة على اليسار، وقائمة الفيديوهات على اليمين.',
      'يشاهد المستخدم الفيديو، ثم ينقر على "الفيديو التالي" بسهولة.',
      'تتوسع أو تنطوي التصنيفات في القائمة الجانبية (Accordion).'
    ],
    altFlows: [
      'شاشات الموبايل: تنطوي القائمة الجانبية ويمكن إظهارها بزر.'
    ],
    assumptions: [
      'الترتيب المتسلسل للفيديوهات مهم جداً لهذه الواجهة.'
    ],
    criteria: [
      { scenario: 'التنقل بين الفيديوهات', given: 'المستخدم يشاهد فيديو', when: 'ينقر على النتيجة التالية في القائمة', then: 'يتغير الفيديو تلقائياً دون إعادة تحميل' },
      { scenario: 'طي التصنيف', given: 'قائمة التصنيفات مفتوحة', when: 'ينقر على عنوان التصنيف', then: 'تُطوى الفيديوهات تحته لتوفير المساحة' }
    ],
    prototype: '../video-help-c.html'
  },
  {
    id: 'd',
    title: 'قصة المستخدم: لوحة الأوامر السريعة (Approach D)',
    role: 'المستخدم المتقدم (Power User)',
    action: 'استخدام اختصار لوحة المفاتيح (Ctrl+K) للبحث المباشر عن الفيديو',
    benefit: 'الوصول اللحظي للفيديوهات دون الحاجة لاستخدام الفأرة أو التنقل في القوائم',
    flow: [
      'يضغط المستخدم على (Ctrl+K) في لوحة المفاتيح.',
      'تظهر لوحة البحث (Command Palette) في منتصف الشاشة مع تمويه الخلفية.',
      'يبدأ المستخدم بكتابة المشكلة (مثال: "فاتورة").',
      'يستخدم الأسهم (أعلى/أسفل) للتنقل في النتائج، ويضغط Enter.',
      'يُعرض الفيديو المختار مباشرة.'
    ],
    altFlows: [
      'الوصول بالفأرة: النقر على أيقونة البحث في الأعلى يفتح نفس اللوحة.'
    ],
    assumptions: [
      'ضرورة التركيز التلقائي (Auto-focus) على شريط البحث عند الفتح.',
      'يجب إيقاف اختصار المتصفح الافتراضي لـ Ctrl+K.'
    ],
    criteria: [
      { scenario: 'فتح اللوحة', given: 'المستخدم في أي مكان', when: 'يضغط Ctrl+K', then: 'تظهر اللوحة وتكون جاهزة للكتابة' },
      { scenario: 'استخدام الأسهم', given: 'نتائج البحث ظاهرة', when: 'يضغط سهم لأسفل', then: 'يتم تحديد النتيجة التالية بلون مختلف' },
      { scenario: 'عملية الإدخال', given: 'تم تحديد نتيجة', when: 'يضغط Enter', then: 'يُفتح فيديو النتيجة المحددة' }
    ],
    prototype: '../video-help-d.html'
  },
  {
    id: 'e',
    title: 'قصة المستخدم: المعالج التفاعلي للمستخدم الجديد (Approach E)',
    role: 'المستخدم الجديد (New User)',
    action: 'المرور بخطوات إعداد النظام عبر فيديوهات متتابعة',
    benefit: 'فهم النظام بالكامل قبل البدء في استخدامه لضمان تجربة صحيحة',
    flow: [
      'يُسجل المستخدم الدخول لأول مرة، فتظهر له شاشة ترحيبية.',
      'يبدأ المعالج (Wizard) بعرض خطوة 1 من 9 (فيديو الإعداد).',
      'بعد المشاهدة، ينقر المستخدم "التالي".',
      'تُحدث القائمة الجانبية بوضع علامة "صح" على الخطوة المنجزة.',
      'يصل للخطوة الأخيرة ويظهر زر "ابدأ الآن" مع رسوم احتفالية.'
    ],
    altFlows: [
      'التخطي: يمكن للمستخدم النقر على "تخطي" لإنهاء المعالج في أي وقت.'
    ],
    assumptions: [
      'يجب حفظ خطوة المستخدم الحالية في قاعدة البيانات، للعودة لها لاحقاً إذا أغلق المتصفح.'
    ],
    criteria: [
      { scenario: 'الخطوة التالية', given: 'المستخدم في خطوة 1', when: 'ينقر التالي', then: 'ينتقل لخطوة 2 ويتم تحديدها كمنجزة في القائمة' },
      { scenario: 'الإنهاء', given: 'المستخدم في الخطوة الأخيرة', when: 'ينقر زر البدء', then: 'يُغلق المعالج ويعود للوحة التحكم' }
    ],
    prototype: '../video-help-e.html'
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
