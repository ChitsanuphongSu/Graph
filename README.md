# 🌐 Data Structures Chapter 11 — Graph Interactive Study App

เว็บแอปพลิเคชันสำหรับเรียนรู้และจำลองการทำงานของโครงสร้างข้อมูล **Graph (กราฟ)** และอัลกอริทึมที่เกี่ยวข้องแบบ Interactive Step-by-Step อ้างอิงเนื้อหาตามหลักสูตรวิชา **Data Structures มหาวิทยาลัยขอนแก่น (ผศ.ดร.สิลดา อินทรโสธรฉันท์)**

---

## ✨ ฟีเจอร์หลัก (Key Features)

### 1. 📖 สรุปเนื้อหาและพื้นฐานกราฟ (Fundamentals & Representation)
- **Graph Fundamentals**: นิยาม $G = (V, E)$, ประเภทของกราฟ (Undirected, Directed, Cyclic, Weighted) และการประยุกต์ใช้งาน (Dependency Graphs, Network Modeling)
- **Graph Representation**: ระบบเปรียบเทียบและแปลงกลับไปมาได้ทันทีระหว่าง:
  - **Adjacency Matrix ($N \times N$)**: แก้ไขค่าในตารางแล้วกราฟอัปเดตแบบเรียลไทม์
  - **Adjacency List**: แสดงตาราง Linked List ตามลำดับตัวอักษร

### 2. ⚡ ระบบจำลองอัลกอริทึมแบบทีละขั้นตอน (Step-by-Step Algorithm Visualizer)
รองรับการควบคุม Play/Pause, ปรับความเร็ว (Speed Slider), ก้าวไปข้างหน้า/ย้อนกลับ พร้อมคำอธิบายและตาราง Trace:
- **Graph Traversal**:
  - **DFS (Depth-First Search)**: จำลองการทำงานด้วย Stack ตามลำดับตัวอักษร
  - **BFS (Breadth-First Search)**: จำลองการทำงานด้วย Queue ตามลำดับตัวอักษร
- **Minimum Spanning Tree (MST)**:
  - **Prim's Algorithm**: เริ่มต้นจากโหนดที่กำหนด พิจารณาเส้นเชื่อมข้างเคียงและเลือกเส้นที่มีน้ำหนักน้อยที่สุดเข้า Tree
  - **Kruskal's Algorithm**: เรียงลำดับ Edge ทั้งหมดตามน้ำหนัก แล้วเลือก Edge ที่ไม่ทำให้เกิด Cycle (Disjoint Set / Union-Find)
- **Shortest Path**:
  - **Dijkstra's Algorithm**: คำนวณระยะทางสะสม $T(v) = T(u) + w(u, v)$ และเลือกเส้นทางสั้นที่สุดเข้า Tree ทีละรอบ พร้อมจัดการกรณีน้ำหนักสะสมเท่ากัน (Ties)

### 3. 🧪 ห้องทดลองสร้างกราฟอิสระ (Interactive Graph Lab)
- โหลดกราฟตัวอย่างจากสไลด์บรรยาย หรือสร้างกราฟขึ้นเอง (เพิ่ม/ลบโหนด, เพิ่ม/ลบเส้นเชื่อม)
- ปรับเปลี่ยนคุณสมบัติกราฟ (Directed / Undirected, Weighted / Unweighted)
- ทดสอบรันอัลกอริทึม DFS, BFS, Prim, Kruskal และ Dijkstra พร้อมระบบตรวจสอบความปลอดภัย (เช่น ตรวจสอบน้ำหนักบวก, เตือนกรณี Negative Weight สำหรับ Dijkstra)

### 4. 📝 แบบฝึกหัดและประเมินผล (Practice, Trace & Quiz)
- **Practice Bank**: คลังข้อสอบทบทวนรายหัวข้อย่อยกว่า 30 ข้อ พร้อมคำอธิบายเฉลยและปุ่ม "ทำข้อนี้ใหม่" (Retry)
- **Trace Practice**: ระบบฝึกไล่สเต็ปอัลกอริทึมด้วยตนเอง
- **Quiz System**: ระบบทดสอบจับเวลา พร้อมสรุปคะแนนและวิเคราะห์จุดอ่อน (Weakness Radar)
- **Common Mistakes & Reference**: รวมจุดที่นักศึกษามักสับสน และ Cheatsheet สรุปสูตร/ความซับซ้อน (Time Complexity)

### 5. 🎨 ดีไซน์และระบบแสดงผล (UI & Theme)
- **Theme Modes**: รองรับ **Light Mode**, **Dark Mode** และ **System Mode** (ติดตามธีม OS แบบ Real-time)
- **Auto-Fit Graph Canvas**: ระบบคำนวณ Bounding Box และปรับมุมมอง SVG อัตโนมัติ ป้องกันโหนดและป้ายกำกับตกขอบ
- **Responsive Layout**: ใช้งานได้ครอบคลุมทั้ง Desktop, Laptop, Tablet และ Mobile

---

## 🛠️ เทคโนโลยีที่ใช้ (Tech Stack)

- **Frontend Framework**: [React 19](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- **Build Tool**: [Vite 8](https://vite.dev/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) + `@tailwindcss/vite`
- **Icons**: [Lucide React](https://lucide.dev/)
- **Testing Framework**: [Vitest](https://vitest.dev/)
- **Linter**: [Oxlint](https://oxc.rs/)

---

## 🚀 การติดตั้งและการใช้งาน (Getting Started)

### 1. ข้อกำหนดเบื้องต้น
- [Node.js](https://nodejs.org/) (แนะนำเวอร์ชัน 18 ขึ้นไป)
- npm หรือ pnpm / yarn

### 2. Clone Repository
```bash
git clone https://github.com/ChitsanuphongSu/Graph.git
cd Graph
```

### 3. ติดตั้ง Dependencies
```bash
npm install
```

### 4. รันโปรเจกต์ในโหมด Development
```bash
npm run dev
```
เปิดเบราว์เซอร์แล้วไปที่ `http://localhost:5173/`

### 5. คำสั่งอื่น ๆ ในโปรเจกต์
- **รัน Unit Tests**:
  ```bash
  npm test
  ```
- **ตรวจสอบโค้ดด้วย Linter**:
  ```bash
  npm run lint
  ```
- **Build สำหรับ Production**:
  ```bash
  npm run build
  ```
- **พรีวิว Production Build**:
  ```bash
  npm run preview
  ```

---

## 📂 โครงสร้างโปรเจกต์ (Project Structure)

```text
Graph/
├── src/
│   ├── algorithms/           # โค้ดและฟังก์ชันอัลกอริทึม (DFS, BFS, Prim, Kruskal, Dijkstra, Utils, Tests)
│   ├── assets/               # รูปภาพและ Asset ประกอบ
│   ├── components/           # UI Components (Sidebar, GraphCanvas, TracePanel ฯลฯ)
│   ├── data/                 # ข้อมูลตัวอย่างกราฟจากสไลด์ และคลังข้อสอบ Practice
│   ├── hooks/                # Custom Hooks (useUserData สำหรับ LocalStorage และ Theme)
│   ├── pages/                # หน้าจอการเรียนรู้แต่ละหัวข้อ (Dashboard, Fundamentals, MST, Dijkstra ฯลฯ)
│   ├── types/                # TypeScript Interfaces & Types
│   ├── App.tsx               # Main Application Component
│   ├── index.css             # Tailwind CSS v4 Theme & Custom Scrollbar
│   └── main.tsx              # React Entry Point
├── package.json
├── vite.config.ts
└── README.md
```

---

## 📜 แหล่งอ้างอิง (References)
- เอกสารประกอบการสอนวิชา **CP352001 Data Structures: Chapter 11 Graph**
- มหาวิทยาลัยขอนแก่น (Khon Kaen University)
- ผู้สอน: ผศ.ดร.สิลดา อินทรโสธรฉันท์
