import React from "react";
import { siteConfig } from "@/config";
import { HaikeiWaveBackground } from "@/components/HaikeiWaveBackground";
import { CouinaudSegmentsViewer } from "@/components/CouinaudSegmentsViewer";
import { RequestForm } from "@/components/RequestForm";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  FileText,
  Upload,
  Cpu,
  Mail,
  ArrowRight,
  Layers,
  Activity,
  ShieldAlert,
  GitBranch,
  ExternalLink,
  ChevronRight,
  Database,
  CheckCircle,
  Eye,
} from "lucide-react";

export default function Home() {
  const scrollToRequest = () => {
    const el = document.getElementById("solicitud");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-800 antialiased selection:bg-[#0B2545]/10 selection:text-[#0B2545]">
      {/* Top Navigation Bar: Minimal & Clinical */}
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-slate-200/80">
        <div className="container max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#0B2545] flex items-center justify-center text-white shadow-xs">
              <Activity className="w-4 h-4 text-sky-300" />
            </div>
            <div className="flex flex-col">
              <span className="text-xs sm:text-sm font-bold text-slate-900 tracking-tight leading-none">
                Segmentación Hepática 3D
              </span>
              <span className="text-[10px] sm:text-[11px] text-slate-500 font-medium">
                Deep Learning en Tomografía Abdominal
              </span>
            </div>
          </div>

          <nav className="flex items-center gap-3 sm:gap-6 text-xs sm:text-sm font-medium">
            <a
              href="#modelo"
              className="text-slate-600 hover:text-[#0B2545] transition-colors hidden sm:inline-block"
            >
              Arquitectura
            </a>
            <a
              href="#como-funciona"
              className="text-slate-600 hover:text-[#0B2545] transition-colors hidden sm:inline-block"
            >
              Cómo funciona
            </a>
            <a
              href="#aviso"
              className="text-slate-600 hover:text-[#0B2545] transition-colors hidden md:inline-block"
            >
              Aviso legal
            </a>
            <Button
              onClick={scrollToRequest}
              size="sm"
              className="bg-[#0B2545] hover:bg-[#134074] text-white rounded-lg px-3.5 py-1.5 text-xs sm:text-sm font-medium shadow-xs"
            >
              Solicitar segmentación
            </Button>
          </nav>
        </div>
      </header>

      <main className="relative">
        {/* 1. HERO SECTION */}
        <section className="relative pt-16 pb-20 sm:pt-24 sm:pb-28 overflow-hidden bg-gradient-to-b from-white via-slate-50/50 to-[#F8FAFC]">
          {/* Subtle Haikei background element */}
          <HaikeiWaveBackground opacity={0.65} />

          <div className="container max-w-6xl mx-auto px-4 relative z-10">
            <div className="max-w-3xl">
              {/* Small badge */}
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-sky-50 text-[#0B2545] border border-sky-200/80 mb-6">
                <span className="w-2 h-2 rounded-full bg-sky-500 animate-pulse" />
                Prototipo de investigación
              </div>

              {/* Title */}
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] font-bold text-slate-900 tracking-tight leading-[1.15] text-balance">
                Segmentación hepática asistida por Deep Learning
              </h1>

              {/* Subtitle */}
              <p className="mt-6 text-lg sm:text-xl text-slate-600 leading-relaxed max-w-2xl text-pretty font-normal">
                Segmentación automática del hígado y de sus segmentos de Couinaud a
                partir de tomografías computadas abdominales.
              </p>

              {/* Primary button */}
              <div className="mt-8 sm:mt-10 flex flex-wrap items-center gap-4">
                <Button
                  onClick={scrollToRequest}
                  size="lg"
                  className="bg-[#0B2545] hover:bg-[#134074] text-white font-medium px-7 py-6 text-base rounded-xl transition-all shadow-md active:scale-[0.98] flex items-center gap-2"
                >
                  Solicitar una segmentación
                  <ArrowRight className="w-4 h-4" />
                </Button>

                <a
                  href="#modelo"
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-slate-600 hover:text-slate-900 px-4 py-3 rounded-xl hover:bg-slate-100 transition-colors"
                >
                  Conocer el modelo
                  <ChevronRight className="w-4 h-4 text-slate-400" />
                </a>
              </div>

              {/* Research quick disclaimer note in hero */}
              <div className="mt-10 pt-6 border-t border-slate-200/80 flex flex-wrap items-center gap-y-2 gap-x-6 text-xs text-slate-500">
                <span className="flex items-center gap-1.5">
                  <Cpu className="w-3.5 h-3.5 text-[#0B2545]" />
                  Modelos 3D U-Net en 2 etapas
                </span>
                <span className="flex items-center gap-1.5">
                  <Database className="w-3.5 h-3.5 text-[#0B2545]" />
                  Salida en formato NIfTI (.nii.gz)
                </span>
                <span className="flex items-center gap-1.5">
                  <Eye className="w-3.5 h-3.5 text-[#0B2545]" />
                  Visualización en 3D Slicer
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* 2. ABOUT THE MODEL */}
        <section id="modelo" className="py-20 sm:py-24 border-t border-slate-200/70 bg-white scroll-mt-16">
          <div className="container max-w-6xl mx-auto px-4">
            <div className="max-w-2xl mb-12">
              <span className="text-xs font-semibold tracking-wider text-slate-500 uppercase">
                Metodología y procesamiento
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight mt-1">
                Arquitectura del sistema
              </h2>
              <p className="mt-3 text-slate-600 text-sm sm:text-base leading-relaxed">
                El flujo de trabajo se divide en dos fases independientes para
                garantizar precisión anatómica y estabilidad en la delimitación
                de los márgenes vasculares e intersegmentarios.
              </p>
            </div>

            {/* Visual Two-Stage Diagram Flow */}
            <div className="mb-14 bg-slate-50 rounded-2xl p-6 sm:p-8 border border-slate-200/80 shadow-xs">
              <div className="flex items-center justify-between gap-4 mb-4">
                <p className="text-xs sm:text-sm font-medium text-slate-600">
                  Flujo completo de la cascada en una única secuencia.
                </p>
                <span className="text-[11px] text-slate-400 sm:hidden whitespace-nowrap">
                  Deslizá →
                </span>
              </div>

              <div className="overflow-x-auto pb-3 -mx-2 px-2 snap-x snap-mandatory">
                <div className="flex items-stretch gap-3 min-w-max">
                  {/* Step 1: Tomografía abdominal */}
                  <div className="w-[220px] sm:w-[235px] bg-white p-5 rounded-xl border border-slate-200 shadow-xs snap-start shrink-0">
                    <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-slate-700 font-mono text-xs font-semibold mb-3">
                      01
                    </div>
                    <h3 className="font-semibold text-slate-900 text-sm sm:text-base">
                      Tomografía abdominal
                    </h3>
                    <p className="text-xs text-slate-500 mt-1">
                      Volumen 3D de TC abdominal en formato NIfTI o DICOM.
                    </p>
                  </div>

                  <div className="flex items-center justify-center w-8 shrink-0 text-slate-400">
                    <ArrowRight className="w-5 h-5" />
                  </div>

                  {/* Step 2: Segmentación del hígado */}
                  <div className="w-[220px] sm:w-[235px] bg-white p-5 rounded-xl border border-[#0B2545]/20 ring-1 ring-[#0B2545]/10 shadow-xs snap-start shrink-0">
                    <div className="w-8 h-8 rounded-lg bg-[#0B2545] flex items-center justify-center text-white font-mono text-xs font-semibold mb-3">
                      02
                    </div>
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="font-semibold text-slate-900 text-sm sm:text-base">
                        Segmentación del hígado
                      </h3>
                      <Badge variant="secondary" className="text-[10px] bg-sky-50 text-sky-800 border-sky-100 shrink-0">
                        Etapa 1
                      </Badge>
                    </div>
                    <p className="text-xs text-slate-500 mt-1">
                      Una 3D U-Net genera la máscara binaria del hígado.
                    </p>
                  </div>

                  <div className="flex items-center justify-center w-8 shrink-0 text-slate-400">
                    <ArrowRight className="w-5 h-5" />
                  </div>

                  {/* Step 3: Segmentación de Couinaud */}
                  <div className="w-[220px] sm:w-[235px] bg-white p-5 rounded-xl border border-slate-200 shadow-xs snap-start shrink-0">
                    <div className="w-8 h-8 rounded-lg bg-sky-900 flex items-center justify-center text-white font-mono text-xs font-semibold mb-3">
                      03
                    </div>
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="font-semibold text-slate-900 text-sm sm:text-base">
                        Segmentación de Couinaud
                      </h3>
                      <Badge variant="secondary" className="text-[10px] bg-slate-100 text-slate-700 shrink-0">
                        Etapa 2
                      </Badge>
                    </div>
                    <p className="text-xs text-slate-500 mt-1">
                      La segunda 3D U-Net recibe la región hepática y asigna las clases anatómicas.
                    </p>
                  </div>

                  <div className="flex items-center justify-center w-8 shrink-0 text-slate-400">
                    <ArrowRight className="w-5 h-5" />
                  </div>

                  {/* Step 4: Segmentos I–VIII */}
                  <div className="w-[220px] sm:w-[235px] bg-white p-5 rounded-xl border border-slate-200 shadow-xs snap-start shrink-0">
                    <div className="w-8 h-8 rounded-lg bg-emerald-700 flex items-center justify-center text-white font-mono text-xs font-semibold mb-3">
                      04
                    </div>
                    <h3 className="font-semibold text-slate-900 text-sm sm:text-base">
                      Segmentos I–VIII
                    </h3>
                    <p className="text-xs text-slate-500 mt-1">
                      Máscara multiclase exportada en NIfTI para su revisión y visualización.
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-slate-200/70 text-slate-700 text-sm sm:text-base leading-relaxed space-y-3">
                <p>
                  El sistema utiliza una cascada de dos modelos basados en U-Net 3D.
                  En una primera etapa identifica el hígado y, a partir de esa región,
                  una segunda red segmenta automáticamente sus ocho regiones anatómicas
                  según la clasificación de Couinaud.
                </p>
                <p>
                  El resultado se entrega en formato NIfTI y puede visualizarse junto
                  con la tomografía original en herramientas como 3D Slicer.
                </p>
              </div>
            </div>

            {/* Cascade overview image */}
            <div className="mb-14 rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-xs">
              <div className="px-5 sm:px-6 py-4 border-b border-slate-100">
                <span className="text-xs font-semibold tracking-wider text-slate-500 uppercase">
                  Esquema general
                </span>
                <h3 className="text-lg font-semibold text-slate-900 mt-0.5">
                  Cascada de dos modelos 3D U-Net
                </h3>
              </div>
              <div className="p-3 sm:p-5 bg-slate-50/60">
                <img
                  src="/images/pipeline-cascada.png"
                  alt="Esquema de la cascada de dos modelos 3D U-Net: tomografía, segmentación hepática, segmentación de Couinaud y visualización final"
                  className="w-full h-auto rounded-xl bg-white border border-slate-100"
                  loading="lazy"
                />
              </div>
            </div>

            {/* Model architecture details */}
            <div className="mb-14 grid grid-cols-1 lg:grid-cols-2 gap-6">
              <details className="group rounded-2xl border border-slate-200 bg-white shadow-xs overflow-hidden">
                <summary className="list-none cursor-pointer px-5 sm:px-6 py-5 flex items-center justify-between gap-4">
                  <div>
                    <span className="text-xs font-semibold tracking-wider text-slate-500 uppercase">
                      Etapa 1
                    </span>
                    <h3 className="font-semibold text-slate-900 mt-0.5">
                      Arquitectura para segmentación del hígado
                    </h3>
                  </div>
                  <span className="text-xs text-slate-500 group-open:hidden">Ver esquema</span>
                  <span className="text-xs text-slate-500 hidden group-open:inline">Ocultar</span>
                </summary>
                <div className="border-t border-slate-100 p-3 bg-slate-50/60">
                  <img
                    src="/images/unet-higado.jpg"
                    alt="Diagrama de la U-Net 3D utilizada para la segmentación binaria del hígado"
                    className="w-full h-auto rounded-xl bg-white"
                    loading="lazy"
                  />
                </div>
              </details>

              <details className="group rounded-2xl border border-slate-200 bg-white shadow-xs overflow-hidden">
                <summary className="list-none cursor-pointer px-5 sm:px-6 py-5 flex items-center justify-between gap-4">
                  <div>
                    <span className="text-xs font-semibold tracking-wider text-slate-500 uppercase">
                      Etapa 2
                    </span>
                    <h3 className="font-semibold text-slate-900 mt-0.5">
                      Arquitectura para segmentos de Couinaud
                    </h3>
                  </div>
                  <span className="text-xs text-slate-500 group-open:hidden">Ver esquema</span>
                  <span className="text-xs text-slate-500 hidden group-open:inline">Ocultar</span>
                </summary>
                <div className="border-t border-slate-100 p-3 bg-slate-50/60">
                  <img
                    src="/images/unet-couinaud.jpg"
                    alt="Diagrama de la U-Net 3D utilizada para la segmentación multiclase de los segmentos de Couinaud"
                    className="w-full h-auto rounded-xl bg-white"
                    loading="lazy"
                  />
                </div>
              </details>
            </div>

            {/* Internal test metrics */}
            <div id="resultados" className="mb-14 scroll-mt-24">
              <div className="max-w-2xl mb-8">
                <span className="text-xs font-semibold tracking-wider text-slate-500 uppercase">
                  Resultados cuantitativos
                </span>
                <h3 className="text-2xl font-bold text-slate-900 tracking-tight mt-1">
                  Desempeño en la prueba interna
                </h3>
                <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                  Métricas obtenidas sobre 32 pacientes reservados para prueba y no utilizados durante el entrenamiento.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs">
                  <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Hígado · Dice</p>
                  <p className="mt-2 text-3xl font-bold tracking-tight text-[#0B2545]">97,63 %</p>
                  <p className="mt-1 text-xs text-slate-500">Segmentación binaria</p>
                </div>
                <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs">
                  <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Hígado · IoU</p>
                  <p className="mt-2 text-3xl font-bold tracking-tight text-[#0B2545]">95,39 %</p>
                  <p className="mt-1 text-xs text-slate-500">Segmentación binaria</p>
                </div>
                <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs">
                  <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Couinaud · Dice</p>
                  <p className="mt-2 text-3xl font-bold tracking-tight text-[#0B2545]">81,56 %</p>
                  <p className="mt-1 text-xs text-slate-500">Promedio multiclase</p>
                </div>
                <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs">
                  <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Couinaud · IoU</p>
                  <p className="mt-2 text-3xl font-bold tracking-tight text-[#0B2545]">70,41 %</p>
                  <p className="mt-1 text-xs text-slate-500">Promedio multiclase</p>
                </div>
              </div>

              <div className="mt-4 rounded-xl border border-slate-200 bg-slate-50 px-5 py-4 text-sm text-slate-600">
                En Couinaud, el mejor caso del conjunto interno alcanzó un Dice promedio de <strong className="text-slate-900">92,67 %</strong> y el caso de menor desempeño obtuvo <strong className="text-slate-900">67,62 %</strong>.
              </div>
            </div>

            {/* Qualitative examples */}
            <div className="mb-14">
              <div className="max-w-2xl mb-8">
                <span className="text-xs font-semibold tracking-wider text-slate-500 uppercase">
                  Ejemplos de segmentación
                </span>
                <h3 className="text-2xl font-bold text-slate-900 tracking-tight mt-1">
                  Resultados cualitativos
                </h3>
                <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                  Comparación sobre un caso del conjunto de prueba y ejemplo de aplicación sobre un estudio clínico externo.
                </p>
              </div>

              <div className="grid grid-cols-1 gap-6">
                <figure className="rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-xs">
                  <div className="p-3 sm:p-5 bg-slate-50/60">
                    <img
                      src="/images/resultado-test.png"
                      alt="Comparación entre máscara de referencia y predicción de segmentos de Couinaud en un paciente del conjunto de prueba"
                      className="w-full h-auto rounded-xl bg-black"
                      loading="lazy"
                    />
                  </div>
                  <figcaption className="px-5 sm:px-6 py-4 border-t border-slate-100">
                    <p className="font-semibold text-slate-900 text-sm">Caso del conjunto de prueba</p>
                    <p className="mt-1 text-xs sm:text-sm text-slate-600 leading-relaxed">
                      La imagen muestra la máscara de referencia (GT) y la predicción del modelo sobre el mismo corte axial.
                    </p>
                  </figcaption>
                </figure>

                <figure className="rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-xs">
                  <div className="p-3 sm:p-5 bg-slate-50/60">
                    <img
                      src="/images/resultado-caso-clinico.png"
                      alt="Tomografía abdominal y predicción de segmentos de Couinaud en un estudio clínico externo sin máscara de referencia"
                      className="w-full h-auto rounded-xl bg-black"
                      loading="lazy"
                    />
                  </div>
                  <figcaption className="px-5 sm:px-6 py-4 border-t border-slate-100">
                    <p className="font-semibold text-slate-900 text-sm">Caso clínico externo</p>
                    <p className="mt-1 text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Aplicación del sistema sobre un estudio real. En este caso no se dispone de una máscara de referencia para comparación cuantitativa.
                    </p>
                  </figcaption>
                </figure>
              </div>
            </div>

            {/* Interactive Anatomical Reference: Couinaud Segments */}
            <CouinaudSegmentsViewer />
          </div>
        </section>

        {/* 3. HOW IT WORKS */}
        <section id="como-funciona" className="py-20 sm:py-24 bg-[#F8FAFC] border-t border-slate-200/70 scroll-mt-16">
          <div className="container max-w-6xl mx-auto px-4">
            <div className="max-w-2xl mb-12">
              <span className="text-xs font-semibold tracking-wider text-slate-500 uppercase">
                Procedimiento para profesionales
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight mt-1">
                Cómo funciona
              </h2>
              <p className="mt-3 text-slate-600 text-sm sm:text-base leading-relaxed">
                El proceso de investigación está pensado para integrarse de forma
                sencilla con las actividades de radiólogos, cirujanos y centros de
                investigación.
              </p>
            </div>

            {/* 4 simple steps */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Step 1 */}
              <div className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-xs flex flex-col justify-between hover:border-slate-300 transition-all">
                <div>
                  <div className="w-10 h-10 rounded-xl bg-sky-50 text-[#0B2545] flex items-center justify-center mb-4 border border-sky-100">
                    <FileText className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-mono font-semibold text-slate-400">
                    Paso 01
                  </span>
                  <h3 className="text-base font-bold text-slate-900 mt-1 mb-2">
                    1. Enviá tu solicitud
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    Completá tus datos profesionales en el formulario inferior.
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-slate-100 text-[11px] text-slate-500 font-medium">
                  Registro inmediato
                </div>
              </div>

              {/* Step 2 */}
              <div className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-xs flex flex-col justify-between hover:border-slate-300 transition-all">
                <div>
                  <div className="w-10 h-10 rounded-xl bg-sky-50 text-[#0B2545] flex items-center justify-center mb-4 border border-sky-100">
                    <Upload className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-mono font-semibold text-slate-400">
                    Paso 02
                  </span>
                  <h3 className="text-base font-bold text-slate-900 mt-1 mb-2">
                    2. Subí la tomografía
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    Podés enviar un archivo NIfTI o una serie DICOM comprimida en
                    ZIP a través del repositorio seguro.
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-slate-100 text-[11px] text-slate-500 font-medium">
                  Estudios anonimizados
                </div>
              </div>

              {/* Step 3 */}
              <div className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-xs flex flex-col justify-between hover:border-slate-300 transition-all">
                <div>
                  <div className="w-10 h-10 rounded-xl bg-sky-50 text-[#0B2545] flex items-center justify-center mb-4 border border-sky-100">
                    <Cpu className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-mono font-semibold text-slate-400">
                    Paso 03
                  </span>
                  <h3 className="text-base font-bold text-slate-900 mt-1 mb-2">
                    3. Procesamos el estudio
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    El estudio se procesa mediante el modelo de segmentación
                    desarrollado en el proyecto.
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-slate-100 text-[11px] text-slate-500 font-medium">
                  Procesamiento 3D U-Net
                </div>
              </div>

              {/* Step 4 */}
              <div className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-xs flex flex-col justify-between hover:border-slate-300 transition-all">
                <div>
                  <div className="w-10 h-10 rounded-xl bg-sky-50 text-[#0B2545] flex items-center justify-center mb-4 border border-sky-100">
                    <Mail className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-mono font-semibold text-slate-400">
                    Paso 04
                  </span>
                  <h3 className="text-base font-bold text-slate-900 mt-1 mb-2">
                    4. Recibí el resultado
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    La segmentación será enviada al correo indicado, habitualmente
                    dentro de las siguientes 24 horas.
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-slate-100 text-[11px] text-slate-500 font-medium">
                  Entrega en formato NIfTI
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 4. REQUEST FORM SECTION */}
        <section className="py-20 sm:py-24 bg-white border-t border-slate-200/70">
          <div className="container max-w-4xl mx-auto px-4">
            <RequestForm />
          </div>
        </section>

        {/* 5. RESEARCH DISCLAIMER */}
        <section id="aviso" className="py-16 bg-slate-50 border-t border-slate-200/70 scroll-mt-16">
          <div className="container max-w-4xl mx-auto px-4">
            <div className="rounded-2xl border border-amber-200/80 bg-amber-50/40 p-6 sm:p-8 flex items-start gap-4 shadow-xs">
              <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-900 flex items-center justify-center shrink-0 mt-0.5">
                <ShieldAlert className="w-5 h-5" />
              </div>
              <div className="space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-amber-900">
                  Prototipo de investigación
                </span>
                <h3 className="text-lg font-semibold text-slate-900">
                  Aviso para uso médico y científico
                </h3>
                <p className="text-sm text-slate-700 leading-relaxed">
                  Las segmentaciones generadas tienen fines de investigación y
                  evaluación. Los resultados deben ser revisados por un profesional
                  cualificado y no deben utilizarse de forma independiente para
                  tomar decisiones diagnósticas o terapéuticas.
                </p>
                <p className="text-xs text-slate-500 pt-1">
                  Este sistema no constituye un dispositivo médico comercial ni un
                  producto sanitario certificado.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* 6. FOOTER */}
      <footer className="bg-slate-900 text-slate-300 py-12 border-t border-slate-800 text-sm">
        <div className="container max-w-6xl mx-auto px-4">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-8 border-b border-slate-800">
            <div className="space-y-1.5 max-w-xl">
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded bg-sky-500 text-slate-900 flex items-center justify-center font-bold text-xs">
                  H
                </div>
                <h4 className="text-white font-semibold text-base">
                  Segmentación hepática asistida por Deep Learning
                </h4>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                Proyecto de segmentación automática del hígado y segmentos de
                Couinaud mediante Deep Learning.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <a
                href={siteConfig.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white transition-all text-xs font-mono border border-slate-700"
              >
                <GitBranch className="w-4 h-4 text-sky-400" />
                GitHub: PI-Velez-Final
                <ExternalLink className="w-3 h-3 opacity-60" />
              </a>
            </div>
          </div>

          <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-3">
            <p>
              © {new Date().getFullYear()} Proyecto de Investigación Biomédica.
              Desarrollado para entornos académicos y clínicos de evaluación.
            </p>
            <p className="font-mono text-slate-400 text-[11px]">
              Vite + React + Tailwind CSS
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
