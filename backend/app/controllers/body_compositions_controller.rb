# frozen_string_literal: true

# 体組成データのAPI管理を行うコントローラー
class BodyCompositionsController < ApplicationController
  def index
    @body_compositions = BodyComposition.ordered.limit(100)
    render json: @body_compositions, except: %i[id created_at updated_at]
  end
end
