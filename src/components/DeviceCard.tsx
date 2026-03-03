import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useTheme } from '../theme/ThemeContext';
import type { Device } from '../store/deviceTypes';

interface DeviceCardProps {
  readonly device: Device;
  readonly onPress: () => void;
}

export function DeviceCard({ device, onPress }: DeviceCardProps) {
  const { theme } = useTheme();
  const { colors, spacing, typography, borderRadius } = theme;

  const isOn = device.on;
  const statusLabel = isOn ? 'Ligado' : 'Desligado';
  const statusBg = isOn ? colors.success : colors.muted;
  const statusColor = isOn ? colors.successContrast : colors.mutedContrast;
  const cardBg = isOn ? colors.cardActive : colors.card;

  const subtitle = [
    `ID: ${device.id}`,
    typeof device.brightness === 'number' ? `${device.brightness}%` : null,
  ]
    .filter(Boolean)
    .join(' • ');

  return (
    <TouchableOpacity
      style={[
        styles.card,
        {
          backgroundColor: cardBg,
          borderRadius,
          padding: spacing.md,
          marginBottom: spacing.sm,
        },
      ]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={styles.row}>
        <Text
          style={[
            styles.name,
            {
              color: colors.text,
              fontSize: typography.body.fontSize,
              fontWeight: typography.body.fontWeight,
            },
          ]}
          numberOfLines={1}
        >
          {device.name}
        </Text>
        <View style={[styles.badge, { backgroundColor: statusBg }]}>
          <Text style={[styles.badgeText, { color: statusColor }]}>
            {statusLabel}
          </Text>
        </View>
      </View>
      <Text
        style={[
          styles.subtitle,
          {
            color: colors.textSecondary,
            fontSize: typography.caption.fontSize,
            marginTop: spacing.xs,
          },
        ]}
      >
        {subtitle}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {},
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  name: {},
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  badgeText: {
    fontSize: 12,
    fontWeight: '600',
  },
  subtitle: {},
});
