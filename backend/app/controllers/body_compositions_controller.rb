# frozen_string_literal: true

class BodyCompositionsController < ApplicationController
  def index
    BodyComposition::Updater.new.call

    records = BodyComposition.ordered.limit(100)
    render json: records.map(&:to_display_hash)
  end
end
