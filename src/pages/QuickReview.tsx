import React from 'react';
import { Sparkles, Check, ArrowRight } from 'lucide-react';
import { StudySection } from '../types';

interface QuickReviewProps {
  onNavigate: (section: StudySection) => void;
}

export const QuickReview: React.FC<QuickReviewProps> = ({ onNavigate }) => {
  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-text-main flex items-center gap-2">
            <Sparkles className="w-6 h-6 text-primary" /> สรุปด่วนเตรียมสอบ (Quick Exam Review)
          </h2>
          <p className="text-sm text-muted">
            ประเด็นสำคัญ นิยาม กฎเกณฑ์ และตารางเปรียบเทียบที่ออกสอบบ่อยจากสไลด์ Chapter 11
          </p>
        </div>
      </div>

      {/* Summary Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Card 1: Graph Basics */}
        <div className="bg-surface p-5 rounded-2xl border border-border shadow-sm space-y-3">
          <div className="flex items-center justify-between border-b border-border pb-2">
            <h3 className="font-bold text-base text-primary">1. นิยามและประเภทของกราฟ</h3>
            <span className="text-xs px-2 py-0.5 bg-primary/10 text-primary font-mono rounded">PDF p. 2-7</span>
          </div>
          <ul className="text-xs md:text-sm text-text-main space-y-2 leading-relaxed">
            <li className="flex items-start gap-2">
              <Check className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
              <span>
                <strong>Graph G:</strong> นิยามเป็นเซตของ <strong>Vertices (V)</strong> และ <strong>Edges (E)</strong>
              </span>
            </li>
            <li className="flex items-start gap-2">
              <Check className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
              <span>
                <strong>Undirected Graph:</strong> เส้นเชื่อมไม่มีทิศทาง (AB = BA)
              </span>
            </li>
            <li className="flex items-start gap-2">
              <Check className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
              <span>
                <strong>Directed Graph (Digraph):</strong> เส้นมีทิศทางชี้จากต้นทางไปปลายทาง โดย <code className="text-primary font-bold">A-&gt;B ≠ B-&gt;A</code>
              </span>
            </li>
            <li className="flex items-start gap-2">
              <Check className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
              <span>
                <strong>Cyclic Graph:</strong> มีเส้นทางที่โหนดแรกและโหนดสุดท้ายเป็นโหนดเดียวกัน เช่น <code className="font-mono">A-&gt;B-&gt;C-&gt;D-&gt;E-&gt;A</code>
              </span>
            </li>
            <li className="flex items-start gap-2">
              <Check className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
              <span>
                <strong>Weighted Graph:</strong> มีค่าน้ำหนักบนเส้นเชื่อม ซึ่งตามสไลด์มักหมายถึงระยะทาง (Distance)
              </span>
            </li>
          </ul>
        </div>

        {/* Card 2: Representation */}
        <div className="bg-surface p-5 rounded-2xl border border-border shadow-sm space-y-3">
          <div className="flex items-center justify-between border-b border-border pb-2">
            <h3 className="font-bold text-base text-primary">2. การแทนกราฟ (Representation)</h3>
            <span className="text-xs px-2 py-0.5 bg-primary/10 text-primary font-mono rounded">PDF p. 8-17</span>
          </div>
          <ul className="text-xs md:text-sm text-text-main space-y-2 leading-relaxed">
            <li className="flex items-start gap-2">
              <Check className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
              <span>
                <strong>Adjacency Matrix:</strong> ตารางขนาด <strong>N × N</strong> แถว=From, คอลัมน์=To (ถ้ามีเส้นเชื่อม M[i][j]=1 หรือ Weight, ไม่มี=0)
              </span>
            </li>
            <li className="flex items-start gap-2">
              <Check className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
              <span>
                <strong>Adjacency List:</strong> โครงสร้างแบบ Linked List ของแต่ละโหนด ตัวชี้ท้ายสุดเป็น <strong>NULL</strong>
              </span>
            </li>
            <li className="flex items-start gap-2">
              <Check className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
              <span>
                <strong>กฎความยาว List:</strong>
                <br />• กราฟไม่มีทิศทาง (Undirected): ผลรวมความยาว = <strong>2 × Edges (2E)</strong>
                <br />• กราฟมีทิศทาง (Directed): ผลรวมความยาว = <strong>Edges (E)</strong>
              </span>
            </li>
          </ul>
        </div>

        {/* Card 3: Traversal (DFS vs BFS) */}
        <div className="bg-surface p-5 rounded-2xl border border-border shadow-sm space-y-3">
          <div className="flex items-center justify-between border-b border-border pb-2">
            <h3 className="font-bold text-base text-primary">3. การท่องกราฟ (DFS vs BFS)</h3>
            <span className="text-xs px-2 py-0.5 bg-primary/10 text-primary font-mono rounded">PDF p. 18-45</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left border-collapse">
              <thead>
                <tr className="border-b border-border bg-surface-elevated">
                  <th className="p-2 font-bold">คุณสมบัติ</th>
                  <th className="p-2 font-bold text-primary">DFS (Depth First)</th>
                  <th className="p-2 font-bold text-blue-500">BFS (Breadth First)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                <tr>
                  <td className="p-2 font-medium">โครงสร้างข้อมูล</td>
                  <td className="p-2 font-semibold">Stack (LIFO)</td>
                  <td className="p-2 font-semibold">Queue (FIFO)</td>
                </tr>
                <tr>
                  <td className="p-2 font-medium">ทิศทางการค้นหา</td>
                  <td className="p-2">Depthward (ลึกที่สุดก่อน)</td>
                  <td className="p-2">Breadthward (ทีละระดับชั้น)</td>
                </tr>
                <tr>
                  <td className="p-2 font-medium">เมื่อเจอทางตัน (Dead end)</td>
                  <td className="p-2">Pop vertex ออกจาก Stack</td>
                  <td className="p-2">Dequeue vertex จากหัวคิว</td>
                </tr>
                <tr>
                  <td className="p-2 font-medium">เงื่อนไขสิ้นสุด</td>
                  <td className="p-2">Stack ว่างเปล่า</td>
                  <td className="p-2">Queue ว่างเปล่า</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Card 4: MST (Prim vs Kruskal) */}
        <div className="bg-surface p-5 rounded-2xl border border-border shadow-sm space-y-3">
          <div className="flex items-center justify-between border-b border-border pb-2">
            <h3 className="font-bold text-base text-primary">4. Minimum Spanning Tree (MST)</h3>
            <span className="text-xs px-2 py-0.5 bg-primary/10 text-primary font-mono rounded">PDF p. 46-84</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left border-collapse">
              <thead>
                <tr className="border-b border-border bg-surface-elevated">
                  <th className="p-2 font-bold">คุณสมบัติ</th>
                  <th className="p-2 font-bold text-primary">Prim's Algorithm</th>
                  <th className="p-2 font-bold text-amber-500">Kruskal's Algorithm</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                <tr>
                  <td className="p-2 font-medium">จุดเริ่มต้น</td>
                  <td className="p-2">เริ่มจาก <strong>Vertex ใด ๆ</strong> ในกราฟ</td>
                  <td className="p-2"><strong>เรียง Edges ทั้งหมด</strong> ตามน้ำหนัก</td>
                </tr>
                <tr>
                  <td className="p-2 font-medium">กลยุทธ์การเลือก</td>
                  <td className="p-2">เลือกเส้นที่มีน้ำหนักน้อยสุดที่ต่อจากโหนดใน Tree ไปข้างนอก</td>
                  <td className="p-2">เลือกเส้นน้ำหนักน้อยสุดทีละเส้น แล้วเช็คว่าเกิด Cycle หรือไม่</td>
                </tr>
                <tr>
                  <td className="p-2 font-medium">การเกิดวงจร</td>
                  <td className="p-2">ไม่เกิดวงจรแน่นอน เพราะเชื่อมไปยังโหนดนอก Tree เสมอ</td>
                  <td className="p-2">ต้องระวังวงจร หากเกิดวงจรต้อง <strong>Reject</strong> ทันที</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Card 5: Shortest Path (Dijkstra) */}
        <div className="bg-surface p-5 rounded-2xl border border-border shadow-sm space-y-3 md:col-span-2">
          <div className="flex items-center justify-between border-b border-border pb-2">
            <h3 className="font-bold text-base text-primary">5. Shortest Path (Dijkstra's Algorithm)</h3>
            <span className="text-xs px-2 py-0.5 bg-primary/10 text-primary font-mono rounded">PDF p. 85-97</span>
          </div>
          <ul className="text-xs md:text-sm text-text-main space-y-2 leading-relaxed">
            <li className="flex items-start gap-2">
              <Check className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
              <span>
                <strong>วัตถุประสงค์:</strong> เพื่อหาเส้นทางที่สั้นที่สุดจากจุดเริ่มต้นไปยังจุดอื่นๆ ในกราฟ
              </span>
            </li>
            <li className="flex items-start gap-2">
              <Check className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
              <span>
                <strong>หัวใจสำคัญ:</strong> คำนวณ <strong>น้ำหนักรวมสะสม (Accumulated Weight: T)</strong> จากจุดเริ่มต้นเสมอ ไม่ใช่แค่น้ำหนักของ Edge เดียว
              </span>
            </li>
            <li className="flex items-start gap-2">
              <Check className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
              <span>
                <strong>กรณีนพิจารณาแล้วค่าสะสมเท่ากัน (Tie):</strong> เช่น ในสไลด์หน้า 90-91 มีค่า T=5 เท่ากันทั้งสองเส้นทาง สามารถเลือกเส้นทางใดเส้นทางหนึ่งได้
              </span>
            </li>
          </ul>
        </div>
      </div>

      {/* Quick Launch Buttons */}
      <div className="p-6 bg-surface-elevated rounded-2xl border border-border flex flex-wrap items-center justify-between gap-4">
        <div>
          <h4 className="font-bold text-text-main text-sm">พร้อมทดสอบความเข้าใจหรือยัง?</h4>
          <p className="text-xs text-muted">ฝึกทำแบบฝึกหัด 30 ข้อ หรือทดลอง Trace อัลกอริทึมจริง</p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => onNavigate('practice')}
            className="px-4 py-2 bg-primary text-white font-semibold rounded-xl text-xs hover:bg-primary-hover transition flex items-center gap-1.5"
          >
            ทำแบบฝึกหัด <ArrowRight className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => onNavigate('trace-practice')}
            className="px-4 py-2 bg-surface text-text-main border border-border font-semibold rounded-xl text-xs hover:bg-surface-elevated transition"
          >
            ฝึก Tracing อัลกอริทึม
          </button>
        </div>
      </div>
    </div>
  );
};
