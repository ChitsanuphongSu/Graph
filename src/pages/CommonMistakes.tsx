import React from 'react';
import { AlertTriangle, CheckCircle2, XCircle } from 'lucide-react';

export const CommonMistakes: React.FC = () => {
  const mistakes = [
    {
      topic: 'Directed Graph vs Undirected Graph',
      mistake: 'เข้าใจผิดว่าเส้นเชื่อมใน Directed Graph เดินทางกลับได้ (คิดว่า A → B เหมือนกับ B → A)',
      correction:
        'ในกราฟระบุทิศทาง เส้นเชื่อม A → B ไม่เท่ากับ B → A โดยเด็ดขาด ค่าใน Adjacency Matrix M[A][B]=1 แต่ M[B][A]=0 (สไลด์หน้า 5, 11)',
    },
    {
      topic: 'Adjacency Matrix Direction',
      mistake: 'สับสนระหว่าง แถว (Row) และ คอลัมน์ (Column) ใน Adjacency Matrix',
      correction:
        'ตามรูปแบบการสอนในสไลด์หน้า 10-12 แถวคือโหนดต้นทาง (From) และคอลัมน์คือโหนดปลายทาง (To)',
    },
    {
      topic: 'Adjacency List Total Length',
      mistake: 'ลืมว่าใน Undirected Graph ความยาวรวมของ List จะเป็น 2 เท่าของจำนวนเส้นเชื่อม (2E)',
      correction:
        'เพราะเส้นเชื่อมที่ไม่มีทิศทาง 1 เส้น จะถูกเพิ่มเข้าไปใน List ของทั้ง 2 โหนดหัวท้าย เช่น 6 Edges จะมีความยาวรวมของ List = 12 (สไลด์หน้า 15)',
    },
    {
      topic: 'DFS Traversal & Stack',
      mistake: 'ลืมว่า DFS ต้องย้อนกลับ (Backtrack) ด้วยการ Pop โหนดออกจาก Stack เมื่อเจอทางตัน',
      correction:
        'ตามกฎ Rule 2 เมื่อโหนดปัจจุบันไม่มี Adjacent Vertex ที่ยังไม่ได้เยี่ยมชมเหลืออยู่ ให้ Pop โหนดออกจาก Stack จนกว่าจะพบโหนดที่มีทางไปต่อ (สไลด์หน้า 20)',
    },
    {
      topic: 'BFS Traversal & Queue',
      mistake: 'สับสนการทำงานของ Queue คิดว่าโหนดที่ใส่ทีหลังจะได้ตรวจก่อน',
      correction:
        'BFS ทำงานแบบ FIFO (First-In First-Out) โหนดที่ Enqueue เข้าไปก่อนตามแนวกว้างจะถูก Dequeue ออกมาตรวจสอบก่อนเสมอ (สไลด์หน้า 32-33)',
    },
    {
      topic: "Prim's Algorithm",
      mistake: 'เลือกเส้นน้ำหนักน้อยที่สุดโดยไม่ได้เชื่อมต่อกับโหนดที่อยู่ใน Tree ปัจจุบัน',
      correction:
        'Prim ต้องเลือกเส้นเชื่อมที่เชื่อมจาก "โหนดที่อยู่ใน Tree แล้ว" ไปยัง "โหนดที่ยังไม่อยู่ใน Tree" เสมอ โดยไม่กระโดดข้ามกลุ่ม (สไลด์หน้า 50, 52)',
    },
    {
      topic: "Kruskal's Algorithm",
      mistake: 'เลือกเส้นเชื่อมที่ทำให้น้ำหนักรวมเพิ่มขึ้นเรื่อยๆ โดยลืมตรวจสอบวงจร (Cycle)',
      correction:
        'Kruskal ต้องระวังวงจร หากเส้นเชื่อมที่พิจารณาเชื่อมต่อระหว่างโหนดที่อยู่ใน Component เดียวกันแล้ว จะทำให้เกิด Loop ต้อง Reject ทันที (สไลด์หน้า 51, 68, 81)',
    },
    {
      topic: "Dijkstra's Algorithm",
      mistake: 'พิจารณาเฉพาะค่าน้ำหนักเส้นเดียว (Edge Weight) แทนที่จะเป็นค่าน้ำหนักสะสม (Accumulated Weight T)',
      correction:
        'หัวใจสำคัญของ Dijkstra ตามสไลด์หน้า 86-88 คือการหาผลรวมสะสม T(v) = T(u) + Weight(u, v) จากจุดเริ่มต้นเสมอ แล้วเลือกเส้นทางที่มีค่า T รวมน้อยที่สุด',
    },
  ];

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div>
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-500/10 text-amber-600 dark:text-amber-400 rounded-full text-xs font-semibold mb-2">
          <AlertTriangle className="w-3.5 h-3.5" /> Exam Pitfalls & Warnings
        </div>
        <h2 className="text-2xl font-bold text-text-main">
          ข้อผิดพลาดที่พบบ่อยในการทำข้อสอบ (Common Mistakes)
        </h2>
        <p className="text-sm text-muted mt-1">
          รวบรวมจุดที่นักศึกษามักสับสนหรือทำผิดบ่อยในข้อสอบวิชาโครงสร้างข้อมูล บทที่ 11
        </p>
      </div>

      <div className="space-y-4">
        {mistakes.map((m, idx) => (
          <div
            key={idx}
            className="p-5 bg-surface rounded-2xl border border-border shadow-sm space-y-3"
          >
            <div className="text-xs font-bold text-primary uppercase tracking-wider">
              {m.topic}
            </div>

            <div className="flex items-start gap-2 text-xs md:text-sm text-red-500 font-medium">
              <XCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
              <span>
                <strong>สิ่งที่มักเข้าใจผิด:</strong> {m.mistake}
              </span>
            </div>

            <div className="flex items-start gap-2 text-xs md:text-sm text-text-main leading-relaxed bg-surface-elevated p-3 rounded-xl border border-border">
              <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
              <span>
                <strong>ความเข้าใจที่ถูกต้องตามบทเรียน:</strong> {m.correction}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
