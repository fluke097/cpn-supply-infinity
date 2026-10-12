# CPN Supply Infinity

เว็บไซต์ภาษาไทยสำหรับ **ห้างหุ้นส่วนจำกัด ซีพีเอ็น ซัพพลาย อินฟินิตี้**
CPN SUPPLY INFINITY LIMITED PARTNERSHIP

หน้าเว็บรองรับคอมพิวเตอร์และมือถือ แสดงบริการระบบไฟฟ้า เครื่องปรับอากาศ โซลาร์เซลล์ ระบบดับเพลิง และ CCTV พร้อมแกลเลอรีผลงานจริง 49 ภาพ ตัวกรองหมวด และภาพขยาย

## เปิดใช้งาน

เปิด `index.html` ด้วยเบราว์เซอร์ได้ทันที ไม่ต้องติดตั้งแพ็กเกจหรือ build โปรเจ็กต์
เก็บโฟลเดอร์ `image/` และ `fonts/` ไว้ด้วยกันกับไฟล์หน้าเว็บ

## โครงสร้าง

- `index.html` — เนื้อหาและโครงสร้างหน้าเว็บ
- `style.css` — รูปแบบพื้นฐาน
- `design.css` — ฟอนต์และธีมสีน้ำเงิน–เทา
- `layout.css` — สัดส่วนและรูปแบบ responsive ปัจจุบัน
- `script.js` — แกลเลอรี เมนูมือถือ และอัลบั้มผลงาน
- `image/` — ภาพหน้าปกและผลงานจริง
- `fonts/` — IBM Plex Sans Thai และใบอนุญาต OFL

## Netlify

ใช้ Netlify Free สำหรับเว็บไซต์ธุรกิจได้ โดยอยู่ภายใต้โควตาของแพ็กเกจ
นำเข้า repository `fluke097/cpn-supply-infinity` และเลือก branch `main`
ไฟล์ `netlify.toml` กำหนด build command เป็น `node build-static.cjs` และ publish directory เป็น `dist`
สคริปต์จะคัดลอกเฉพาะไฟล์เว็บไซต์ รูปภาพ และฟอนต์ เพื่อไม่เผยแพร่ไฟล์ทดสอบหรือไฟล์เครื่องมือ

## Vercel (โฮสต์เดิม)

นำเข้า repository `fluke097/cpn-supply-infinity` ในทีม `sara-dcff`
ใช้ Framework Preset **Other** และ Root Directory เป็นรากของ repository
โปรเจ็กต์กำหนด `vercel.json` ให้เผยแพร่ไฟล์ static โดยไม่ต้อง install หรือ build
เมื่อเชื่อมต่อ GitHub แล้ว การ push ไป branch `main` จะสร้าง deployment ใหม่

## GitHub Pages

หากต้องการเผยแพร่เว็บไซต์ผ่าน GitHub Pages หลังอัปโหลด repository:

1. เปิด **Settings → Pages**
2. เลือก **Deploy from a branch**
3. เลือก branch **main** และโฟลเดอร์ **/ (root)** แล้วกด **Save**

## ฟอนต์

IBM Plex Sans Thai จาก Google Fonts ใช้ภายใต้ SIL Open Font License ดู `fonts/OFL.txt`

## เพิ่มผลงานใหม่

จัดภาพเป็น `image/<หมวด>/<ชื่องาน>/` เช่น `image/Air/งานที่3/` หนึ่งโฟลเดอร์เป็นหนึ่งอัลบั้ม
รองรับ JPG, JPEG, PNG, WebP และ AVIF รวมทั้งรูปในโฟลเดอร์ย่อย
รัน `node build-static.cjs` เพื่อสร้างข้อมูลอัลบั้มและไฟล์เว็บไซต์ใน `dist/`
เมื่อ commit และ push รูปใหม่ขึ้น GitHub Netlify จะสร้างข้อมูลและเผยแพร่อัตโนมัติ
ไฟล์ในเครื่องเพียงอย่างเดียวยังไม่ถูกส่งไปเว็บไซต์

ภาพแรกตามลำดับชื่อไฟล์จะเป็นภาพปก สามารถเลือกเองและตั้งชื่อให้ลูกค้าอ่านง่ายด้วย `project.json` ในโฟลเดอร์งาน (ไม่จำเป็น):

```json
{"title":"ติดตั้งเครื่องปรับอากาศสำนักงาน","description":"งานติดตั้งและเดินระบบท่อ","cover":"cover.jpg","published":true}
```

ตั้ง `published` เป็น `false` เพื่อซ่อนงาน และโฟลเดอร์ที่ไม่มีรูปจะไม่แสดง
หมวดที่รองรับ: Power, Air, Sola, Firefighting, Test_power และ CCTV
ข้อมูล `projects-data.js` สร้างโดย `generate-projects.cjs` ไม่ควรแก้รายชื่อภาพในไฟล์นี้โดยตรง
ก่อนเปิด index.html ในเครื่องให้รัน `node generate-projects.cjs` หลังเพิ่มหรือย้ายรูป