import React from 'react';
import { FileText, BookOpen, ExternalLink } from 'lucide-react';

export const Reference: React.FC = () => {
  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <div>
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-semibold mb-2">
          <FileText className="w-3.5 h-3.5" /> Course Document Source of Truth
        </div>
        <h2 className="text-2xl font-bold text-text-main">
          เอกสารอ้างอิงและอภิธานศัพท์ (Reference & Course Metadata)
        </h2>
        <p className="text-sm text-muted mt-1">
          ข้อมูลแหล่งที่มาอย่างเป็นทางการของเนื้อหาบทที่ 11
        </p>
      </div>

      {/* Course Source Card */}
      <div className="p-6 bg-surface rounded-3xl border border-border shadow-sm space-y-3">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary font-bold">
            <BookOpen className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-bold text-base text-text-main">
              Chapter 11: Graph (เอกสารประกอบการสอนวิชา โครงสร้างข้อมูล)
            </h3>
            <p className="text-xs text-muted">
              ผู้สอน: ผศ.ดร.สิลดา อินทรโสธรฉันท์ • สาขาวิชาวิทยาการคอมพิวเตอร์ วิทยาลัยการคอมพิวเตอร์ มหาวิทยาลัยขอนแก่น
            </p>
          </div>
        </div>
      </div>

      {/* Terminology Dictionary */}
      <div className="bg-surface rounded-2xl border border-border p-6 shadow-sm space-y-4">
        <h3 className="font-bold text-base text-text-main">
          อภิธานศัพท์ทางการประจำบท (Technical Glossary)
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs leading-relaxed">
          <div className="p-3 bg-surface-elevated rounded-xl border border-border space-y-1">
            <strong className="text-primary font-mono text-sm block">Vertex / Vertices (จุดยอด)</strong>
            <p className="text-muted">
              จุดหรือโหนดที่ใช้แทนตัวตน (Entity) ในระบบเครือข่ายกราฟ
            </p>
          </div>
          <div className="p-3 bg-surface-elevated rounded-xl border border-border space-y-1">
            <strong className="text-primary font-mono text-sm block">Edge / Edges (เส้นเชื่อม)</strong>
            <p className="text-muted">
              เส้นหรือลิงก์ที่เชื่อมระหว่างจุดยอดสองจุด (Links connecting vertices)
            </p>
          </div>
          <div className="p-3 bg-surface-elevated rounded-xl border border-border space-y-1">
            <strong className="text-primary font-mono text-sm block">Undirected Graph</strong>
            <p className="text-muted">
              กราฟที่เส้นเชื่อมไม่มีทิศทาง สามารถเดินทางไปกลับได้ทั้งสองทาง
            </p>
          </div>
          <div className="p-3 bg-surface-elevated rounded-xl border border-border space-y-1">
            <strong className="text-primary font-mono text-sm block">Directed Graph (Digraph)</strong>
            <p className="text-muted">
              กราฟที่เส้นเชื่อมมีหัวลูกศรระบุทิศทางแน่นอนจากต้นทางสู่ปลายทาง
            </p>
          </div>
          <div className="p-3 bg-surface-elevated rounded-xl border border-border space-y-1">
            <strong className="text-primary font-mono text-sm block">Cycle / Cyclic Graph (วงจร)</strong>
            <p className="text-muted">
              เส้นทางในกราฟที่มีจุดยอดเริ่มต้นและจุดยอดสิ้นสุดเป็นจุดเดียวกัน
            </p>
          </div>
          <div className="p-3 bg-surface-elevated rounded-xl border border-border space-y-1">
            <strong className="text-primary font-mono text-sm block">Weighted Graph (กราฟถ่วงน้ำหนัก)</strong>
            <p className="text-muted">
              กราฟที่มีค่าน้ำหนักกำกับบนแต่ละเส้นเชื่อม (มักแทนระยะทางหรือค่าใช้จ่าย)
            </p>
          </div>
          <div className="p-3 bg-surface-elevated rounded-xl border border-border space-y-1">
            <strong className="text-primary font-mono text-sm block">Adjacency Matrix</strong>
            <p className="text-muted">
              ตารางเมทริกซ์ 2 มิติขนาด N x N ที่เก็บสถานะและค่าน้ำหนักของเส้นเชื่อม
            </p>
          </div>
          <div className="p-3 bg-surface-elevated rounded-xl border border-border space-y-1">
            <strong className="text-primary font-mono text-sm block">Adjacency List</strong>
            <p className="text-muted">
              รายการโยง (Linked List) เก็บโหนดข้างเคียงของแต่ละจุดยอด ปิดท้ายด้วย NULL
            </p>
          </div>
          <div className="p-3 bg-surface-elevated rounded-xl border border-border space-y-1">
            <strong className="text-primary font-mono text-sm block">Depth First Search (DFS)</strong>
            <p className="text-muted">
              การค้นหาแบบลงลึก ใช้ Stack ช่วยจำโหนดเพื่อย้อนกลับเมื่อเจอทางตัน
            </p>
          </div>
          <div className="p-3 bg-surface-elevated rounded-xl border border-border space-y-1">
            <strong className="text-primary font-mono text-sm block">Breadth First Search (BFS)</strong>
            <p className="text-muted">
              การค้นหาตามแนวกว้าง ใช้ Queue ในการจัดลำดับการแวะชมโหนดทีละชั้น
            </p>
          </div>
          <div className="p-3 bg-surface-elevated rounded-xl border border-border space-y-1">
            <strong className="text-primary font-mono text-sm block">Minimum Spanning Tree (MST)</strong>
            <p className="text-muted">
              ต้นไม้ครอบคลุมทุกจุดยอดในกราฟแบบไม่มีวงจร และมีผลรวมค่าน้ำหนักน้อยที่สุด
            </p>
          </div>
          <div className="p-3 bg-surface-elevated rounded-xl border border-border space-y-1">
            <strong className="text-primary font-mono text-sm block">Shortest Path (Dijkstra)</strong>
            <p className="text-muted">
              การค้นหาเส้นทางที่มีผลรวมค่าน้ำหนักสะสม (Accumulated Weight) น้อยที่สุด
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
