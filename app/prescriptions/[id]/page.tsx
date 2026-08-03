'use client';

import { useRouter } from 'next/navigation';
import { Navbar } from '@/components/navbar';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RiskBadge } from '@/components/risk-badge';
import { mockPrescriptions } from '@/lib/mockData';
import Link from 'next/link';

interface PrescriptionDetailPageProps {
  params: {
    id: string;
  };
}

export default function PrescriptionDetailPage({ params }: PrescriptionDetailPageProps) {
  const router = useRouter();
  const prescription = mockPrescriptions.find((p) => p.id === params.id) || mockPrescriptions[0];

  return (
    <>
      <Navbar title="Prescription Details" />
      <div className="flex-1 overflow-auto">
        <div className="p-8 max-w-4xl mx-auto space-y-6">
          {/* Header */}
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">
                Dr. {prescription.doctorName}
              </h1>
              <p className="text-muted-foreground">{prescription.hospitalName}</p>
              <p className="text-sm text-muted-foreground mt-2">
                📅 {new Date(prescription.date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </p>
            </div>
            <RiskBadge level={prescription.riskLevel} />
          </div>

          {/* Medicines Breakdown */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-foreground">Medicines Prescribed</h2>
            {prescription.medicines.map((medicine, index) => (
              <Card key={index} className="p-6">
                <div className="space-y-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-foreground">{medicine.name}</h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        Dosage: <span className="font-medium text-foreground">{medicine.dosage}</span>
                      </p>
                    </div>
                    <span className="px-4 py-2 bg-accent/10 text-accent rounded-lg text-sm font-semibold whitespace-nowrap ml-4">
                      {medicine.frequency}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm pt-4 border-t border-border">
                    <div>
                      <p className="text-muted-foreground font-semibold mb-1">Duration</p>
                      <p className="text-foreground">{medicine.duration}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground font-semibold mb-1">Instructions</p>
                      <p className="text-foreground">{medicine.instructions}</p>
                    </div>
                  </div>

                  {/* Warnings */}
                  {medicine.warnings.length > 0 && (
                    <div className="pt-4 border-t border-border">
                      <p className="text-sm font-semibold text-foreground mb-3">⚠️ Important Warnings</p>
                      <div className="bg-red-50 dark:bg-red-950/20 rounded-lg p-4 space-y-2 border border-red-200/30">
                        {medicine.warnings.map((warning, idx) => (
                          <div key={idx} className="flex items-start gap-3">
                            <span className="text-red-500 font-bold mt-0.5">!</span>
                            <span className="text-sm text-red-700 dark:text-red-200">{warning}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Interactions */}
                  {medicine.interactions && medicine.interactions.length > 0 && (
                    <div className="pt-4 border-t border-border">
                      <p className="text-sm font-semibold text-foreground mb-3">🔗 Drug Interactions</p>
                      <div className="bg-yellow-50 dark:bg-yellow-950/20 rounded-lg p-4 space-y-2 border border-yellow-200/30">
                        {medicine.interactions.map((interaction, idx) => (
                          <div key={idx} className="flex items-start gap-3">
                            <span className="text-yellow-600 font-bold mt-0.5">⚡</span>
                            <span className="text-sm text-yellow-700 dark:text-yellow-200">
                              May interact with <strong>{interaction}</strong>
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </Card>
            ))}
          </div>

          {/* Doctor Notes */}
          {prescription.notes && (
            <Card className="p-6 bg-secondary/20 border-secondary/30">
              <h3 className="text-lg font-semibold text-foreground mb-3">📝 Doctor Notes</h3>
              <p className="text-foreground leading-relaxed">{prescription.notes}</p>
            </Card>
          )}

          {/* Additional Information */}
          <Card className="p-6 bg-blue-50 dark:bg-blue-950/20 border-blue-200/30">
            <h3 className="text-lg font-semibold text-foreground mb-4">💡 Health Tips</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <span className="text-blue-500 mt-0.5">•</span>
                <span className="text-foreground">Set daily reminders for your medications</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-blue-500 mt-0.5">•</span>
                <span className="text-foreground">Take medications at the same time each day</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-blue-500 mt-0.5">•</span>
                <span className="text-foreground">Do not skip doses without consulting your doctor</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-blue-500 mt-0.5">•</span>
                <span className="text-foreground">Report any side effects immediately</span>
              </li>
            </ul>
          </Card>

          {/* Action Buttons */}
          <div className="flex gap-4 pt-6">
            <Button asChild className="flex-1">
              <Link href="/prescriptions/history">Back to History</Link>
            </Button>
            <Button asChild variant="outline" className="flex-1">
              <Link href="/ask-ai">Ask AI Questions</Link>
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
