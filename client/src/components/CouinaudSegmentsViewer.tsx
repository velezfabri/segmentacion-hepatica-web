import React, { useState } from "react";
import { Badge } from "@/components/ui/badge";

interface SegmentInfo {
  id: string;
  roman: string;
  nombre: string;
  lado: "Derecho" | "Izquierdo" | "Caudado";
  descripcion: string;
}

const SEGMENTOS: SegmentInfo[] = [
  {
    id: "I",
    roman: "I",
    nombre: "Lóbulo Caudado",
    lado: "Caudado",
    descripcion: "Segmento dorsal posterior autónomo con drenaje vascular directo.",
  },
  {
    id: "II",
    roman: "II",
    nombre: "Segmento Lateral Superior",
    lado: "Izquierdo",
    descripcion: "Sector lateral izquierdo porción craneal / posterolateral.",
  },
  {
    id: "III",
    roman: "III",
    nombre: "Segmento Lateral Inferior",
    lado: "Izquierdo",
    descripcion: "Sector lateral izquierdo porción caudal / anterolateral.",
  },
  {
    id: "IV",
    roman: "IV",
    nombre: "Segmento Medial (IVa / IVb)",
    lado: "Izquierdo",
    descripcion: "Lóbulo cuadrado y territorio medial adyacente a la fisura umbilical.",
  },
  {
    id: "V",
    roman: "V",
    nombre: "Segmento Anterior Inferior",
    lado: "Derecho",
    descripcion: "Sector anterior derecho porción anteroinferior.",
  },
  {
    id: "VI",
    roman: "VI",
    nombre: "Segmento Posterior Inferior",
    lado: "Derecho",
    descripcion: "Sector posterior derecho porción posteroinferior.",
  },
  {
    id: "VII",
    roman: "VII",
    nombre: "Segmento Posterior Superior",
    lado: "Derecho",
    descripcion: "Sector posterior derecho porción posterosuperior domo.",
  },
  {
    id: "VIII",
    roman: "VIII",
    nombre: "Segmento Anterior Superior",
    lado: "Derecho",
    descripcion: "Sector anterior derecho porción anterosuperior domo.",
  },
];

export function CouinaudSegmentsViewer() {
  const [activeSegment, setActiveSegment] = useState<string>("IV");

  const current = SEGMENTOS.find((s) => s.id === activeSegment) || SEGMENTOS[3];

  return (
    <div className="rounded-2xl border border-slate-200 bg-white/95 p-6 shadow-sm">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 pb-4 border-b border-slate-100">
        <div>
          <span className="text-xs font-semibold tracking-wider text-slate-500 uppercase">
            Clasificación anatómica
          </span>
          <h4 className="text-lg font-semibold text-slate-900 tracking-tight">
            Segmentación de Couinaud (I–VIII)
          </h4>
        </div>
        <Badge variant="outline" className="border-sky-200 text-sky-800 bg-sky-50/70 text-xs w-fit">
          8 Segmentos funcionales
        </Badge>
      </div>

      {/* Anatomical Schematic Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
        {/* Interactive Segment Buttons / Schematic layout */}
        <div className="md:col-span-7 bg-slate-50/80 p-4 rounded-xl border border-slate-100">
          <p className="text-xs text-slate-600 mb-3 font-medium">
            Seleccioná un segmento para ver su referencia anatómica:
          </p>

          <div className="grid grid-cols-4 gap-2">
            {SEGMENTOS.map((seg) => {
              const isSelected = seg.id === activeSegment;
              return (
                <button
                  key={seg.id}
                  type="button"
                  onClick={() => setActiveSegment(seg.id)}
                  className={`flex flex-col items-center justify-center p-3 rounded-lg border text-center transition-all ${
                    isSelected
                      ? "bg-[#0B2545] text-white border-[#0B2545] shadow-sm scale-[1.02]"
                      : "bg-white hover:bg-slate-100 text-slate-700 border-slate-200/90"
                  }`}
                >
                  <span className="text-base font-bold font-mono tracking-tight">
                    {seg.roman}
                  </span>
                  <span
                    className={`text-[10px] mt-0.5 line-clamp-1 ${
                      isSelected ? "text-sky-200" : "text-slate-500"
                    }`}
                  >
                    {seg.lado}
                  </span>
                </button>
              );
            })}
          </div>

          <div className="mt-3 flex items-center justify-between text-[11px] text-slate-500 px-1 pt-2 border-t border-slate-200/60">
            <span>Orientación anatómica estándar</span>
            <span className="font-mono text-slate-400">NIfTI labels 1–8</span>
          </div>
        </div>

        {/* Selected Segment Details Card */}
        <div className="md:col-span-5 bg-[#0B2545]/[0.025] rounded-xl p-5 border border-slate-200">
          <div className="flex items-center gap-2 mb-2">
            <span className="inline-flex items-center justify-center w-7 h-7 rounded-md bg-[#0B2545] text-white font-mono text-sm font-bold">
              {current.roman}
            </span>
            <div>
              <span className="text-[11px] font-medium uppercase tracking-wider text-slate-500">
                Segmento {current.roman}
              </span>
              <h5 className="text-sm font-semibold text-slate-900 leading-snug">
                {current.nombre}
              </h5>
            </div>
          </div>

          <div className="mt-3 text-xs text-slate-600 leading-relaxed">
            {current.descripcion}
          </div>

          <div className="mt-4 pt-3 border-t border-slate-200/80 grid grid-cols-2 gap-2 text-[11px]">
            <div>
              <span className="text-slate-500 block">Territorio:</span>
              <span className="font-medium text-slate-800">
                {current.lado === "Caudado" ? "Autónomo" : `Lóbulo ${current.lado}`}
              </span>
            </div>
            <div>
              <span className="text-slate-500 block">Identificador NIfTI:</span>
              <span className="font-mono font-medium text-slate-800">
                label_{current.id}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
