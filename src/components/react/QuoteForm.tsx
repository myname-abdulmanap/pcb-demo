import React, { useState } from 'react';

interface QuoteFormData {
  fullName: string;
  company: string;
  email: string;
  phone: string;
  pcbType: string;
  layers: string;
  quantity: string;
  material: string;
  surfaceFinish: string;
  assemblyRequired: string;
  targetDelivery: string;
  notes: string;
}

export default function QuoteForm() {
  const [form, setForm] = useState<QuoteFormData>({
    fullName: '',
    company: '',
    email: '',
    phone: '',
    pcbType: 'Rigid FR-4',
    layers: '2',
    quantity: '10',
    material: 'FR-4 High-Tg 170°C',
    surfaceFinish: 'HASL Lead-Free',
    assemblyRequired: 'No (Bare PCB Only)',
    targetDelivery: 'Standard (5-7 business days)',
    notes: '',
  });

  const [fileName, setFileName] = useState<string | null>(null);
  const [fileSize, setFileSize] = useState<string | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setFileName(file.name);
      setFileSize((file.size / (1024 * 1024)).toFixed(2) + ' MB');
    }
  };

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!form.fullName.trim()) errs.fullName = 'Full name is required';
    if (!form.email.trim()) {
      errs.email = 'Business email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      errs.email = 'Please provide a valid email';
    }
    if (!form.phone.trim()) errs.phone = 'Phone number is required';
    if (!form.quantity || parseInt(form.quantity) < 1) errs.quantity = 'Specify valid quantity';

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setStatus('loading');
    setTimeout(() => {
      setStatus('success');
    }, 1000);
  };

  if (status === 'success') {
    return (
      <div className="bg-white border border-brand-200 rounded-3xl p-8 sm:p-12 shadow-floating text-center max-w-2xl mx-auto animate-fade-in">
        <div className="w-20 h-20 bg-brand-50 rounded-full flex items-center justify-center mx-auto mb-6 border border-brand-200">
          <svg className="w-10 h-10 text-brand-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
          </svg>
        </div>

        <span className="inline-block px-3 py-1 bg-brand-100 text-brand-800 text-xs font-semibold rounded-full mb-3">
          Quote Reference #PCB-{Math.floor(100000 + Math.random() * 900000)}
        </span>

        <h3 className="text-2xl font-extrabold text-dark mb-3">
          Quotation Request Submitted!
        </h3>

        <p className="text-secondary text-sm leading-relaxed mb-6">
          Thank you, <strong className="text-dark">{form.fullName}</strong>. Your custom project configuration for{' '}
          <strong className="text-dark">{form.layers}-layer {form.pcbType} ({form.quantity} pcs)</strong> has been logged.
          Our CAM engineering division is analyzing your requirements and will email your formal DFM estimate and itemized pricing within <strong>2 to 4 hours</strong>.
        </p>

        <div className="bg-surface p-4 rounded-xl text-left border border-border text-xs space-y-2 mb-8 text-secondary">
          <div className="flex justify-between">
            <span>Customer:</span>
            <span className="font-semibold text-dark">{form.fullName} ({form.company || 'Private'})</span>
          </div>
          <div className="flex justify-between">
            <span>Email / WhatsApp:</span>
            <span className="font-semibold text-dark">{form.email} / {form.phone}</span>
          </div>
          <div className="flex justify-between">
            <span>PCB Configuration:</span>
            <span className="font-semibold text-dark">{form.layers} Layers, {form.material}, {form.surfaceFinish}</span>
          </div>
          <div className="flex justify-between">
            <span>Target Delivery:</span>
            <span className="font-semibold text-brand-700">{form.targetDelivery}</span>
          </div>
          {fileName && (
            <div className="flex justify-between">
              <span>Attached File:</span>
              <span className="font-semibold text-brand-700">{fileName} ({fileSize})</span>
            </div>
          )}
        </div>

        <button
          type="button"
          onClick={() => {
            setStatus('idle');
            setFileName(null);
          }}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-brand-500 hover:bg-brand-600 text-white font-semibold text-sm transition-all shadow-md shadow-brand-500/20"
        >
          <span>Configure Another Board</span>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white border border-border rounded-3xl p-6 sm:p-10 shadow-card max-w-4xl mx-auto space-y-8">
      {/* Contact Section */}
      <div>
        <h3 className="text-lg font-bold text-dark mb-4 flex items-center gap-2 border-b border-border pb-2">
          <span className="w-6 h-6 rounded-full bg-brand-500 text-white text-xs flex items-center justify-center font-bold">1</span>
          Contact & Company Details
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-dark mb-1.5" htmlFor="q-fullName">
              Full Name <span className="text-red-500">*</span>
            </label>
            <input
              id="q-fullName"
              type="text"
              value={form.fullName}
              onChange={(e) => setForm({ ...form, fullName: e.target.value })}
              placeholder="e.g. Raden Arya"
              className={`w-full px-3.5 py-2.5 text-sm rounded-lg border bg-surface transition-all focus:bg-white focus:outline-none ${
                errors.fullName ? 'border-red-500 ring-1 ring-red-500' : 'border-border focus:border-brand-500 focus:ring-1 focus:ring-brand-500'
              }`}
            />
            {errors.fullName && <p className="text-xs text-red-500 mt-1">{errors.fullName}</p>}
          </div>

          <div>
            <label className="block text-xs font-semibold text-dark mb-1.5" htmlFor="q-company">
              Company / University / Studio
            </label>
            <input
              id="q-company"
              type="text"
              value={form.company}
              onChange={(e) => setForm({ ...form, company: e.target.value })}
              placeholder="e.g. PT Telekomunikasi Nusantara"
              className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-border bg-surface transition-all focus:bg-white focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-dark mb-1.5" htmlFor="q-email">
              Business Email <span className="text-red-500">*</span>
            </label>
            <input
              id="q-email"
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              placeholder="arya@telekom.co.id"
              className={`w-full px-3.5 py-2.5 text-sm rounded-lg border bg-surface transition-all focus:bg-white focus:outline-none ${
                errors.email ? 'border-red-500 ring-1 ring-red-500' : 'border-border focus:border-brand-500 focus:ring-1 focus:ring-brand-500'
              }`}
            />
            {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
          </div>

          <div>
            <label className="block text-xs font-semibold text-dark mb-1.5" htmlFor="q-phone">
              WhatsApp / Direct Phone <span className="text-red-500">*</span>
            </label>
            <input
              id="q-phone"
              type="tel"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              placeholder="+62 811 2345 6789"
              className={`w-full px-3.5 py-2.5 text-sm rounded-lg border bg-surface transition-all focus:bg-white focus:outline-none ${
                errors.phone ? 'border-red-500 ring-1 ring-red-500' : 'border-border focus:border-brand-500 focus:ring-1 focus:ring-brand-500'
              }`}
            />
            {errors.phone && <p className="text-xs text-red-500 mt-1">{errors.phone}</p>}
          </div>
        </div>
      </div>

      {/* Technical Specifications */}
      <div>
        <h3 className="text-lg font-bold text-dark mb-4 flex items-center gap-2 border-b border-border pb-2">
          <span className="w-6 h-6 rounded-full bg-brand-500 text-white text-xs flex items-center justify-center font-bold">2</span>
          PCB Technical Specifications
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {/* PCB Type */}
          <div>
            <label className="block text-xs font-semibold text-dark mb-1.5" htmlFor="q-pcbType">
              PCB Type
            </label>
            <select
              id="q-pcbType"
              value={form.pcbType}
              onChange={(e) => setForm({ ...form, pcbType: e.target.value })}
              className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-border bg-surface focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500"
            >
              <option value="Rigid FR-4">Standard Rigid FR-4</option>
              <option value="Multilayer HDI">Multilayer HDI with Microvias</option>
              <option value="Flex PCB">Flexible Polyimide (FPC)</option>
              <option value="Rigid-Flex">Rigid-Flex Composite</option>
              <option value="Aluminum MCPCB">Aluminum Core (MCPCB)</option>
              <option value="High Frequency RF">Rogers RF / Ceramic Substrate</option>
            </select>
          </div>

          {/* Number of Layers */}
          <div>
            <label className="block text-xs font-semibold text-dark mb-1.5" htmlFor="q-layers">
              Layer Count
            </label>
            <select
              id="q-layers"
              value={form.layers}
              onChange={(e) => setForm({ ...form, layers: e.target.value })}
              className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-border bg-surface focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500 font-medium"
            >
              <option value="1">1 Layer (Single-Sided)</option>
              <option value="2">2 Layers (Double-Sided)</option>
              <option value="4">4 Layers</option>
              <option value="6">6 Layers</option>
              <option value="8">8 Layers</option>
              <option value="10">10 Layers</option>
              <option value="12">12 Layers</option>
              <option value="16+">16+ Layers (Advanced)</option>
            </select>
          </div>

          {/* Quantity */}
          <div>
            <label className="block text-xs font-semibold text-dark mb-1.5" htmlFor="q-quantity">
              Quantity (Pcs) <span className="text-red-500">*</span>
            </label>
            <input
              id="q-quantity"
              type="number"
              min="1"
              value={form.quantity}
              onChange={(e) => setForm({ ...form, quantity: e.target.value })}
              className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-border bg-surface focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500"
            />
            {errors.quantity && <p className="text-xs text-red-500 mt-1">{errors.quantity}</p>}
          </div>

          {/* Material */}
          <div>
            <label className="block text-xs font-semibold text-dark mb-1.5" htmlFor="q-material">
              Base Material
            </label>
            <select
              id="q-material"
              value={form.material}
              onChange={(e) => setForm({ ...form, material: e.target.value })}
              className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-border bg-surface focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500"
            >
              <option value="FR-4 Standard Tg 135°C">FR-4 Standard Tg 135°C</option>
              <option value="FR-4 High-Tg 170°C">FR-4 High-Tg 170°C (Recommended)</option>
              <option value="Aluminum 1.5 W/mK">Aluminum MCPCB (1.5–2.0 W/m·K)</option>
              <option value="Rogers RO4350B">Rogers RO4350B (High Frequency)</option>
              <option value="Polyimide Flex">Polyimide PI (Flex)</option>
            </select>
          </div>

          {/* Surface Finish */}
          <div>
            <label className="block text-xs font-semibold text-dark mb-1.5" htmlFor="q-surfaceFinish">
              Surface Finish
            </label>
            <select
              id="q-surfaceFinish"
              value={form.surfaceFinish}
              onChange={(e) => setForm({ ...form, surfaceFinish: e.target.value })}
              className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-border bg-surface focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500"
            >
              <option value="HASL Lead-Free">HASL Lead-Free (RoHS)</option>
              <option value="ENIG (Gold)">ENIG (Immersion Gold 1-2u")</option>
              <option value="Immersion Silver">Immersion Silver</option>
              <option value="OSP">OSP (Organic Solderability Preservative)</option>
              <option value="Hard Gold">Hard Gold (Finger Contact)</option>
            </select>
          </div>

          {/* Assembly Required */}
          <div>
            <label className="block text-xs font-semibold text-dark mb-1.5" htmlFor="q-assemblyRequired">
              Assembly Service (PCBA)
            </label>
            <select
              id="q-assemblyRequired"
              value={form.assemblyRequired}
              onChange={(e) => setForm({ ...form, assemblyRequired: e.target.value })}
              className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-border bg-surface focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500 font-medium text-brand-700"
            >
              <option value="No (Bare PCB Only)">No (Bare PCB Fabrication Only)</option>
              <option value="Turnkey Assembly (We source components)">Turnkey Assembly (Full Sourcing + SMT)</option>
              <option value="Consigned Assembly (You supply components)">Consigned Assembly (You supply components)</option>
              <option value="Combo (Partial Turnkey)">Combo (Partial Sourcing)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Target Delivery & File Upload */}
      <div>
        <h3 className="text-lg font-bold text-dark mb-4 flex items-center gap-2 border-b border-border pb-2">
          <span className="w-6 h-6 rounded-full bg-brand-500 text-white text-xs flex items-center justify-center font-bold">3</span>
          Timeline & Gerber Files
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Target Delivery */}
          <div>
            <label className="block text-xs font-semibold text-dark mb-1.5">
              Target Delivery Turnaround
            </label>
            <div className="space-y-2">
              {[
                { id: 'std', val: 'Standard (5-7 business days)', desc: 'Most economical choice for planned orders' },
                { id: 'exp', val: 'Expedited (3-4 business days)', desc: 'Fast turnaround for rapid iterations' },
                { id: 'rush', val: 'Rush 24–48 Hours', desc: 'Urgent emergency prototype fabrication' },
              ].map((item) => (
                <label
                  key={item.id}
                  className={`flex items-start gap-3 p-3 rounded-xl border cursor-pointer transition-all ${
                    form.targetDelivery === item.val
                      ? 'border-brand-500 bg-brand-50/50 ring-1 ring-brand-500'
                      : 'border-border hover:border-dark/30 bg-surface'
                  }`}
                >
                  <input
                    type="radio"
                    name="targetDelivery"
                    value={item.val}
                    checked={form.targetDelivery === item.val}
                    onChange={(e) => setForm({ ...form, targetDelivery: e.target.value })}
                    className="mt-0.5 text-brand-600 focus:ring-brand-500"
                  />
                  <div>
                    <span className="text-xs font-semibold text-dark block">{item.val}</span>
                    <span className="text-[11px] text-secondary">{item.desc}</span>
                  </div>
                </label>
              ))}
            </div>
          </div>

          {/* Gerber File Upload Dropzone */}
          <div>
            <label className="block text-xs font-semibold text-dark mb-1.5">
              Upload Gerber / PCB Files (ZIP, RAR, ODB++, or STEP)
            </label>
            <div className="relative border-2 border-dashed border-border hover:border-brand-500 rounded-2xl p-6 text-center bg-surface transition-colors">
              <input
                type="file"
                id="gerber-file"
                accept=".zip,.rar,.tar,.gz,.tgz,.7z,.pcb,.kicad_pcb,.brd"
                onChange={handleFileChange}
                className="absolute inset-0 opacity-0 w-full h-full cursor-pointer"
              />
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 rounded-full bg-brand-100 text-brand-600 flex items-center justify-center mb-2">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                  </svg>
                </div>
                {fileName ? (
                  <div className="text-xs text-brand-700 font-semibold">
                    <p className="truncate max-w-[200px]">{fileName}</p>
                    <span className="text-secondary font-normal">{fileSize} • Click to replace</span>
                  </div>
                ) : (
                  <>
                    <p className="text-xs font-semibold text-dark">
                      Drag & drop your archive here, or <span className="text-brand-600 underline">browse</span>
                    </p>
                    <p className="text-[11px] text-secondary mt-1">
                      Max file size: 50MB. Files are protected under strict NDA.
                    </p>
                  </>
                )}
              </div>
            </div>

            {/* Additional notes */}
            <div className="mt-3">
              <label className="block text-[11px] font-medium text-secondary mb-1" htmlFor="q-notes">
                Special Requirements or Tolerances (Optional)
              </label>
              <textarea
                id="q-notes"
                rows={2}
                value={form.notes}
                onChange={(e) => setForm({ ...form, notes: e.target.value })}
                placeholder="e.g. 50-ohm single-ended impedance on Layer 1, matte black solder mask..."
                className="w-full px-3 py-2 text-xs rounded-lg border border-border bg-surface focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Submit Button */}
      <div className="pt-4 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2 text-xs text-secondary">
          <svg className="w-4 h-4 text-brand-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
          </svg>
          <span>All files and design IP are encrypted and strictly protected under NDA.</span>
        </div>

        <button
          type="submit"
          disabled={status === 'loading'}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-brand-500 hover:bg-brand-600 text-white font-semibold text-sm transition-all shadow-md shadow-brand-500/25 disabled:opacity-50"
        >
          {status === 'loading' ? (
            <>
              <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
              </svg>
              <span>Calculating Quote...</span>
            </>
          ) : (
            <>
              <span>Request a Quote</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </>
          )}
        </button>
      </div>
    </form>
  );
}
