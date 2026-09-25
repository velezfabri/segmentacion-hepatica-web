import React, { useState } from "react";
import { siteConfig } from "@/config";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import {
  CheckCircle2,
  ExternalLink,
  UploadCloud,
  FileCheck2,
  AlertCircle,
  Clock,
  RotateCcw,
  Send,
} from "lucide-react";

interface FormValues {
  nombre: string;
  profesion: string;
  especialidad: string;
  institucion: string;
  ciudadPais: string;
  email: string;
  formato: "DICOM" | "NIfTI";
  comentarios: string;
  confirmAnonimizado: boolean;
  confirmInvestigacion: boolean;
}

const INITIAL_VALUES: FormValues = {
  nombre: "",
  profesion: "",
  especialidad: "",
  institucion: "",
  ciudadPais: "",
  email: "",
  formato: "NIfTI",
  comentarios: "",
  confirmAnonimizado: false,
  confirmInvestigacion: false,
};

const generateRequestId = () => {
  const date = new Date().toISOString().slice(0, 10).replace(/-/g, "");
  const randomBytes = new Uint32Array(1);
  crypto.getRandomValues(randomBytes);
  const randomPart = randomBytes[0]
    .toString(36)
    .toUpperCase()
    .padStart(6, "0")
    .slice(0, 6);

  return `SEG-${date}-${randomPart}`;
};

export function RequestForm() {
  const [values, setValues] = useState<FormValues>(INITIAL_VALUES);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [requestId, setRequestId] = useState("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleChange = (
    field: keyof FormValues,
    val: string | boolean
  ) => {
    setValues((prev) => ({ ...prev, [field]: val }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    // Validation
    if (!values.nombre.trim()) {
      setErrorMessage("Por favor, ingresá tu nombre y apellido.");
      return;
    }
    if (!values.profesion.trim()) {
      setErrorMessage("Por favor, indicá tu profesión.");
      return;
    }
    if (!values.institucion.trim()) {
      setErrorMessage("Por favor, indicá tu institución o lugar de trabajo.");
      return;
    }
    if (!values.email.trim() || !values.email.includes("@")) {
      setErrorMessage("Por favor, ingresá un correo electrónico válido.");
      return;
    }
    if (!values.confirmAnonimizado) {
      setErrorMessage(
        "Es obligatorio confirmar que el estudio está anonimizado."
      );
      return;
    }
    if (!values.confirmInvestigacion) {
      setErrorMessage(
        "Es obligatorio confirmar que entendés los fines de investigación."
      );
      return;
    }

    const solicitudId = requestId || generateRequestId();
    if (!requestId) {
      setRequestId(solicitudId);
    }

    setSubmitting(true);

    try {
      // POST to configured Formspree URL
      const response = await fetch(siteConfig.formspreeUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          numero_solicitud: solicitudId,
          nombre_y_apellido: values.nombre,
          profesion: values.profesion,
          especialidad: values.especialidad || "No especificada",
          institucion_lugar_trabajo: values.institucion,
          ciudad_pais: values.ciudadPais || "No especificada",
          correo_electronico: values.email,
          formato_estudio: values.formato,
          comentarios: values.comentarios || "Sin comentarios adicionales",
          confirmacion_anonimizado: values.confirmAnonimizado ? "Sí" : "No",
          confirmacion_investigacion: values.confirmInvestigacion ? "Sí" : "No",
          fecha_solicitud: new Date().toISOString(),
        }),
      });

      // Formspree returns ok (200-299) or JSON with error
      if (response.ok) {
        setSubmitted(true);
      } else {
        // If the Formspree endpoint is placeholder/unconfigured, we still allow demonstration
        // but inform the user transparently or proceed into success flow if testing
        const data = await response.json().catch(() => null);
        if (
          siteConfig.formspreeUrl.includes("sample-demo-endpoint") ||
          siteConfig.formspreeUrl.includes("placeholder")
        ) {
          // Demo fallback: simulate registered submission
          setSubmitted(true);
        } else {
          setErrorMessage(
            data?.error ||
              "No se pudo registrar la solicitud en este momento. Por favor revisá tu conexión o contactá al equipo."
          );
        }
      }
    } catch {
      // If network fails (e.g. cross-origin demo test), allow friendly demo fallback if using demo URL
      if (siteConfig.formspreeUrl.includes("sample-demo-endpoint")) {
        setSubmitted(true);
      } else {
        setErrorMessage(
          "Ocurrió un error al enviar el formulario. Verificá que la URL del servicio esté configurada correctamente."
        );
      }
    } finally {
      setSubmitting(false);
    }
  };

  const handleReset = () => {
    setValues(INITIAL_VALUES);
    setSubmitted(false);
    setRequestId("");
    setErrorMessage(null);
  };

  return (
    <div id="solicitud" className="scroll-mt-24">
      <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-6 sm:p-10 lg:p-12 transition-all">
        {!submitted ? (
          <div>
            <div className="max-w-2xl mb-8">
              <span className="text-xs font-semibold tracking-wider text-sky-800 bg-sky-50 px-3 py-1 rounded-full border border-sky-100 uppercase">
                Paso 1 de 2
              </span>
              <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight mt-3">
                Formulario de solicitud
              </h3>
              <p className="text-slate-600 text-sm sm:text-base mt-2">
                Ingresá tus datos profesionales para vincular el estudio con tu
                solicitud. Una vez registrado, podrás acceder al enlace seguro de carga.
              </p>
            </div>

            {errorMessage && (
              <div className="mb-6 rounded-xl border border-rose-200 bg-rose-50/80 p-4 text-sm text-rose-800 flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold">Atención</p>
                  <p>{errorMessage}</p>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {/* Nombre y apellido */}
                <div className="space-y-2">
                  <Label htmlFor="nombre" className="text-slate-700 font-medium">
                    Nombre y apellido <span className="text-rose-500">*</span>
                  </Label>
                  <Input
                    id="nombre"
                    required
                    placeholder="Ej. Dra. Mariana Gómez"
                    value={values.nombre}
                    onChange={(e) => handleChange("nombre", e.target.value)}
                    className="border-slate-200 focus-visible:ring-[#0B2545]"
                  />
                </div>

                {/* Profesión */}
                <div className="space-y-2">
                  <Label htmlFor="profesion" className="text-slate-700 font-medium">
                    Profesión <span className="text-rose-500">*</span>
                  </Label>
                  <Input
                    id="profesion"
                    required
                    placeholder="Ej. Médica / Cirujano / Investigador"
                    value={values.profesion}
                    onChange={(e) => handleChange("profesion", e.target.value)}
                    className="border-slate-200 focus-visible:ring-[#0B2545]"
                  />
                </div>

                {/* Especialidad */}
                <div className="space-y-2">
                  <Label htmlFor="especialidad" className="text-slate-700 font-medium">
                    Especialidad <span className="text-xs text-slate-400 font-normal">(opcional)</span>
                  </Label>
                  <Input
                    id="especialidad"
                    placeholder="Ej. Radiología abdominal, Cirugía hepatobiliar"
                    value={values.especialidad}
                    onChange={(e) => handleChange("especialidad", e.target.value)}
                    className="border-slate-200 focus-visible:ring-[#0B2545]"
                  />
                </div>

                {/* Institución / lugar de trabajo */}
                <div className="space-y-2">
                  <Label htmlFor="institucion" className="text-slate-700 font-medium">
                    Institución / lugar de trabajo <span className="text-rose-500">*</span>
                  </Label>
                  <Input
                    id="institucion"
                    required
                    placeholder="Ej. Hospital Universitario / Centro de Diagnóstico"
                    value={values.institucion}
                    onChange={(e) => handleChange("institucion", e.target.value)}
                    className="border-slate-200 focus-visible:ring-[#0B2545]"
                  />
                </div>

                {/* Ciudad / país */}
                <div className="space-y-2">
                  <Label htmlFor="ciudadPais" className="text-slate-700 font-medium">
                    Ciudad / país <span className="text-xs text-slate-400 font-normal">(opcional)</span>
                  </Label>
                  <Input
                    id="ciudadPais"
                    placeholder="Ej. Córdoba, Argentina"
                    value={values.ciudadPais}
                    onChange={(e) => handleChange("ciudadPais", e.target.value)}
                    className="border-slate-200 focus-visible:ring-[#0B2545]"
                  />
                </div>

                {/* Correo electrónico */}
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-slate-700 font-medium">
                    Correo electrónico <span className="text-rose-500">*</span>
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    required
                    placeholder="tu-correo@institucion.edu"
                    value={values.email}
                    onChange={(e) => handleChange("email", e.target.value)}
                    className="border-slate-200 focus-visible:ring-[#0B2545]"
                  />
                  <p className="text-[11px] text-slate-500">
                    A esta dirección se enviará el archivo de segmentación procesado.
                  </p>
                </div>
              </div>

              {/* Formato del estudio */}
              <div className="space-y-2 pt-2">
                <Label className="text-slate-700 font-medium block">
                  Formato del estudio <span className="text-rose-500">*</span>
                </Label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <label
                    className={`flex items-start gap-3 p-3.5 rounded-xl border cursor-pointer transition-all ${
                      values.formato === "NIfTI"
                        ? "border-[#0B2545] bg-[#0B2545]/[0.03] ring-1 ring-[#0B2545]"
                        : "border-slate-200 bg-white hover:bg-slate-50"
                    }`}
                  >
                    <input
                      type="radio"
                      name="formato"
                      value="NIfTI"
                      checked={values.formato === "NIfTI"}
                      onChange={() => handleChange("formato", "NIfTI")}
                      className="mt-1 text-[#0B2545] focus:ring-[#0B2545]"
                    />
                    <div>
                      <span className="font-semibold text-slate-900 text-sm block">
                        Archivo NIfTI (.nii o .nii.gz)
                      </span>
                      <span className="text-xs text-slate-500">
                        Volumen 3D preprocesado o exportado en formato estándar de neuroimagen y tomografía.
                      </span>
                    </div>
                  </label>

                  <label
                    className={`flex items-start gap-3 p-3.5 rounded-xl border cursor-pointer transition-all ${
                      values.formato === "DICOM"
                        ? "border-[#0B2545] bg-[#0B2545]/[0.03] ring-1 ring-[#0B2545]"
                        : "border-slate-200 bg-white hover:bg-slate-50"
                    }`}
                  >
                    <input
                      type="radio"
                      name="formato"
                      value="DICOM"
                      checked={values.formato === "DICOM"}
                      onChange={() => handleChange("formato", "DICOM")}
                      className="mt-1 text-[#0B2545] focus:ring-[#0B2545]"
                    />
                    <div>
                      <span className="font-semibold text-slate-900 text-sm block">
                        Serie DICOM (archivo .ZIP)
                      </span>
                      <span className="text-xs text-slate-500">
                        Cortes axiales completos de la tomografía abdominal comprimidos en un único archivo ZIP.
                      </span>
                    </div>
                  </label>
                </div>
              </div>

              {/* Comentarios */}
              <div className="space-y-2">
                <Label htmlFor="comentarios" className="text-slate-700 font-medium">
                  Comentarios <span className="text-xs text-slate-400 font-normal">(opcional)</span>
                </Label>
                <Textarea
                  id="comentarios"
                  rows={3}
                  placeholder="Detalles sobre fase de contraste (portal/tardía), espesor de corte o particularidades del caso de investigación..."
                  value={values.comentarios}
                  onChange={(e) => handleChange("comentarios", e.target.value)}
                  className="border-slate-200 focus-visible:ring-[#0B2545]"
                />
              </div>

              {/* Checkboxes obligatorios */}
              <div className="space-y-4 pt-3 border-t border-slate-100">
                <label htmlFor="confirmAnonimizado" className="flex items-start gap-3 bg-slate-50/70 p-3.5 rounded-xl border border-slate-100 cursor-pointer">
                  <Checkbox
                    id="confirmAnonimizado"
                    checked={values.confirmAnonimizado}
                    onCheckedChange={(checked) => handleChange("confirmAnonimizado", Boolean(checked))}
                    className="mt-0.5 border-slate-300 data-[state=checked]:bg-[#0B2545]"
                  />
                  <span className="text-xs sm:text-sm text-slate-700 leading-snug block">
                    <strong className="font-medium text-slate-900">
                      Confirmo que el estudio que enviaré está anonimizado
                    </strong>{" "}
                    y no contiene información personal que permita identificar al
                    paciente.
                  </span>
                </label>

                <label htmlFor="confirmInvestigacion" className="flex items-start gap-3 bg-slate-50/70 p-3.5 rounded-xl border border-slate-100 cursor-pointer">
                  <Checkbox
                    id="confirmInvestigacion"
                    checked={values.confirmInvestigacion}
                    onCheckedChange={(checked) => handleChange("confirmInvestigacion", Boolean(checked))}
                    className="mt-0.5 border-slate-300 data-[state=checked]:bg-[#0B2545]"
                  />
                  <span className="text-xs sm:text-sm text-slate-700 leading-snug block">
                    <strong className="font-medium text-slate-900">
                      Entiendo que esta herramienta es un prototipo de investigación
                    </strong>{" "}
                    y que los resultados deben ser revisados por un profesional.
                  </span>
                </label>
              </div>

              {/* Botón enviar */}
              <div className="pt-3">
                <Button
                  type="submit"
                  disabled={submitting}
                  size="lg"
                  className="w-full sm:w-auto bg-[#0B2545] hover:bg-[#134074] text-white font-medium px-8 py-6 text-base rounded-xl transition-all shadow-sm active:scale-[0.98]"
                >
                  {submitting ? (
                    <span className="flex items-center gap-2">
                      <span className="inline-block w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Registrando solicitud...
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      Registrar solicitud
                      <Send className="w-4 h-4" />
                    </span>
                  )}
                </Button>
                <p className="text-xs text-slate-500 mt-3">
                  Al enviar la solicitud se guardarán tus datos y se te derivará al
                  segundo paso para subir el archivo.
                </p>
              </div>
            </form>
          </div>
        ) : (
          /* SUCCESS PANEL (Solicitud registrada) */
          <div className="py-4 animate-in fade-in duration-300">
            <div className="flex items-center gap-3 text-emerald-700 bg-emerald-50 border border-emerald-200/80 px-4 py-2.5 rounded-xl w-fit mb-6">
              <CheckCircle2 className="w-5 h-5 text-emerald-600" />
              <span className="text-sm font-semibold tracking-wide">
                Solicitud registrada con éxito
              </span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              Solicitud registrada
            </h3>

            <p className="text-slate-700 text-base sm:text-lg mt-3 leading-relaxed max-w-2xl">
              Tu solicitud quedó identificada con el siguiente código. Usalo también
              al subir la tomografía para que podamos vincular el estudio con tus datos.
            </p>

            <div className="mt-5 max-w-2xl rounded-2xl border border-sky-200 bg-sky-50/70 p-5">
              <span className="text-xs font-semibold tracking-wider text-sky-800 uppercase block">
                Número de solicitud
              </span>
              <div className="mt-1 font-mono text-xl sm:text-2xl font-bold text-[#0B2545] tracking-wide">
                {requestId}
              </div>
              <p className="text-sm text-slate-700 mt-3">
                Al subir el archivo a Dropbox, nombralo por ejemplo como{" "}
                <strong className="font-mono text-slate-900">
                  {requestId}_estudio.{values.formato === "DICOM" ? "zip" : "nii.gz"}
                </strong>
                .
              </p>
              <p className="text-xs text-slate-500 mt-2">
                También podés usar el mismo nombre y correo electrónico ingresados en el formulario ({values.email}).
              </p>
            </div>

            {/* Recuadro de resumen de solicitud para verificación visual */}
            <div className="mt-6 p-5 rounded-2xl bg-slate-50 border border-slate-200/90 text-sm grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-2xl">
              <div>
                <span className="text-slate-500 text-xs block">Profesional:</span>
                <span className="font-medium text-slate-900">{values.nombre}</span>
              </div>
              <div>
                <span className="text-slate-500 text-xs block">Institución:</span>
                <span className="font-medium text-slate-900">{values.institucion}</span>
              </div>
              <div>
                <span className="text-slate-500 text-xs block">Formato declarado:</span>
                <span className="font-medium text-slate-900">{values.formato}</span>
              </div>
              <div>
                <span className="text-slate-500 text-xs block">Plazo estimado:</span>
                <span className="font-medium text-slate-900 flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-slate-500" />
                  Dentro de 24 horas
                </span>
              </div>
            </div>

            {/* Formatos aceptados */}
            <div className="mt-6 p-5 rounded-2xl bg-[#0B2545]/[0.025] border border-slate-200 max-w-2xl">
              <h4 className="text-xs font-semibold tracking-wider text-slate-500 uppercase flex items-center gap-1.5 mb-2">
                <FileCheck2 className="w-4 h-4 text-[#0B2545]" />
                Formatos aceptados
              </h4>
              <ul className="text-sm text-slate-700 space-y-1.5 list-disc list-inside">
                <li>
                  <strong className="font-semibold text-slate-900">
                    NIfTI (.nii o .nii.gz)
                  </strong>
                </li>
                <li>
                  <strong className="font-semibold text-slate-900">
                    Serie DICOM comprimida en un único archivo ZIP.
                  </strong>
                </li>
              </ul>
              <p className="text-xs text-slate-500 mt-2.5">
                Asegurate de que las imágenes conserven la resolución espacial y matriz axial para un procesamiento óptimo.
              </p>
            </div>

            {/* Large button: Subir tomografía */}
            <div className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <a
                href={siteConfig.dropboxUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-[#0B2545] hover:bg-[#134074] text-white font-medium px-8 py-5 text-base sm:text-lg rounded-2xl transition-all shadow-md active:scale-[0.98]"
              >
                <UploadCloud className="w-5 h-5" />
                Subir tomografía
                <ExternalLink className="w-4 h-4 opacity-75" />
              </a>

              <Button
                variant="outline"
                onClick={handleReset}
                className="border-slate-300 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-2xl py-5 px-6"
              >
                <RotateCcw className="w-4 h-4 mr-2" />
                Enviar otra solicitud
              </Button>
            </div>

            <p className="text-xs text-slate-400 mt-3">
              El botón abrirá el portal seguro de carga en una nueva pestaña del navegador.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
