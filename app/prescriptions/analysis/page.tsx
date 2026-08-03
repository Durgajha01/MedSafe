'use client';

import { Navbar } from '@/components/navbar';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RiskBadge } from '@/components/risk-badge';
import Link from 'next/link';
import { mockPrescriptions } from '@/lib/mockData';

export default function AnalysisPage() {
  const prescription = mockPrescriptions[0]; // Use first prescription for demo

  return (
    <>
      <Navbar title="Prescription Analysis" />
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
                📅 {new Date(prescription.date).toLocaleDateString()}
              </p>
            </div>
            <RiskBadge level={prescription.riskLevel} />
          </div>

          {/* Overview */}
          <Card className="p-6 border-border/50">
            <h2 className="text-xl font-bold text-foreground mb-4">Overview</h2>
            <p className="text-foreground leading-relaxed">
              This prescription contains {prescription.medicines.length} medication(s) with a {prescription.riskLevel} risk level. 
              {prescription.riskLevel === 'moderate' && ' Monitor for interactions and follow dosage instructions carefully.'}
              {prescription.riskLevel === 'high' && ' Regular monitoring and follow-up consultations are recommended.'}
            </p>
          </Card>

          {/* Medicines */}
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-foreground">Medicines</h2>
            {prescription.medicines.map((medicine, index) => (
              <Card key={index} className="p-6 border-border/50">
                <div className="space-y-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-lg font-semibold text-foreground">{medicine.name}</h3>
                      <p className="text-sm text-muted-foreground">{medicine.dosage}</p>
                    </div>
                    <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium">
                      {medicine.frequency}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
                    <div>
                      <p className="text-muted-foreground font-medium">Duration</p>
                      <p className="text-foreground">{medicine.duration}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground font-medium">Instructions</p>
                      <p className="text-foreground">{medicine.instructions}</p>
                    </div>
                  </div>

                  {/* Warnings */}
                  {medicine.warnings.length > 0 && (
                    <div className="pt-4 border-t border-border">
                      <p className="text-sm font-semibold text-foreground mb-2">⚠️ Warnings:</p>
                      <ul className="space-y-1">
                        {medicine.warnings.map((warning, idx) => (
                          <li key={idx} className="text-sm text-destructive flex items-start gap-2">
                            <span className="mt-0.5">•</span>
                            <span>{warning}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Interactions */}
                  {medicine.interactions && medicine.interactions.length > 0 && (
                    <div className="pt-4 border-t border-border">
                      <p className="text-sm font-semibold text-foreground mb-2">🔗 Drug Interactions:</p>
                      <ul className="space-y-1">
                        {medicine.interactions.map((interaction, idx) => (
                          <li key={idx} className="text-sm text-accent flex items-start gap-2">
                            <span className="mt-0.5">•</span>
                            <span>Avoid {interaction}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </Card>
            ))}
          </div>

          {/* Full Explanation */}
          <Card className="p-6 border-border/50 bg-secondary/10">
            <h2 className="text-xl font-bold text-foreground mb-4">📋 Full Prescription Explanation</h2>
            <div className="space-y-4 text-foreground leading-relaxed">
              <p>
                This prescription has been analyzed by our AI system and contains {prescription.medicines.length} medication(s). 
                All medications are being taken together, which may have interaction effects.
              </p>
              <p>
                <strong>Key Points:</strong>
              </p>
              <ul className="list-disc pl-5 space-y-2">
                <li>Follow the prescribed dosage and frequency strictly</li>
                <li>Take medications with meals if stomach upset occurs</li>
                <li>Set reminders for consistent medication timing</li>
                <li>Report any adverse effects to your doctor</li>
                <li>Do not skip doses even if feeling better</li>
              </ul>
              {prescription.notes && (
                <p>
                  <strong>Doctor Notes:</strong> {prescription.notes}
                </p>
              )}
            </div>
          </Card>

          {/* Action Buttons */}
          <div className="flex gap-4 pt-6">
            <Button asChild className="flex-1">
              <Link href="/prescriptions/history">Back to History</Link>
            </Button>
            <Button asChild variant="outline" className="flex-1">
              <Link href="/prescriptions/upload">Upload Another</Link>
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
